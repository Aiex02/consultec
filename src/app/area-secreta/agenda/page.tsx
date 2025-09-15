"use client";

import { useEffect, useMemo, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiPlus, FiTrash2 } from "react-icons/fi";

/**
 * Tabela sugerida no Supabase: tax_events
 * - id: uuid (pk, default uuid_generate_v4())
 * - title: text
 * - description: text
 * - start: timestamptz
 * - end: timestamptz (nullable)
 * - all_day: boolean (default false)
 * - created_at: timestamptz (default now())
 * - created_by: uuid (nullable) -> auth.users.id
 *
 * Política RLS (opcional):
 *  - habilitar RLS
 *  - permitir select para usuários autenticados
 *  - insert/update/delete somente pelo dono (created_by = auth.uid())
 */

type DbEvent = {
  id: string;
  title: string;
  description: string | null;
  start: string; // ISO
  end: string | null; // ISO
  all_day: boolean;
  created_at: string;
};

export default function AgendaTributariaPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState<string>(""); // YYYY-MM-DDTHH:mm
  const [end, setEnd] = useState<string>("");
  const [allDay, setAllDay] = useState<boolean>(true);

  const [updating, setUpdating] = useState(false);
  const [pendingChange, setPendingChange] = useState<{ id: string; start: string; end: string | null } | null>(null);

  const toolbar = useMemo(
    () => ({
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,dayGridWeek",
    }),
    []
  );

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("tax_events")
      .select("id, title, description, start, end, all_day, created_at")
      .order("start", { ascending: true });
    if (error) setError(error.message);
    setEvents(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pendingChange) return;
    const t = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from("tax_events")
          .update({ start: pendingChange.start, end: pendingChange.end })
          .eq("id", pendingChange.id);
        if (error) throw error;
      } catch (e) {
        setError((e as Error).message);
        // Recarrega para garantir consistência se algo falhar
        loadEvents();
      } finally {
        setPendingChange(null);
      }
    }, 500); // debounce 500ms
    return () => clearTimeout(t);
  }, [pendingChange]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setAllDay(true);
  };

  const openCreateAt = (isoStart: string, isAllDay = false) => {
    resetForm();
    setStart(formatToLocalInput(isoStart, isAllDay));
    setAllDay(true);
    setIsOpen(true);
  };

  const handleDateClick = (arg: DateClickArg) => {
    // arg.dateStr no dayGrid vem como 'YYYY-MM-DD'. Passamos direto para o input.
    openCreateAt(arg.dateStr, true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const ev = events.find((e) => e.id === arg.event.id);
    if (!ev) return;
    setEditingId(ev.id);
    setTitle(ev.title);
    setDescription(ev.description ?? "");
    setAllDay(ev.all_day);
    setStart(formatToLocalInput(ev.start, ev.all_day));
    setEnd(formatToLocalInput(ev.end ?? "", ev.all_day));
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      description: description || null,
      start: parseFromLocalInput(start, allDay),
      end: end ? parseFromLocalInput(end, allDay) : null,
      all_day: true,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("tax_events")
        .update(payload)
        .eq("id", editingId)
        .select("id, title, description, start, end, all_day, created_at")
        .single();
      setSaving(false);
      if (error) return setError(error.message);
      if (data) {
        setEvents((prev) => prev.map((x) => (x.id === data.id ? (data as DbEvent) : x)));
        setIsOpen(false);
      }
    } else {
      const { data, error } = await supabase
        .from("tax_events")
        .insert(payload)
        .select("id, title, description, start, end, all_day, created_at")
        .single();
      setSaving(false);
      if (error) return setError(error.message);
      if (data) {
        setEvents((prev) => [data as DbEvent, ...prev]);
        setIsOpen(false);
      }
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    const { error } = await supabase.from("tax_events").delete().eq("id", editingId);
    if (error) return setError(error.message);
    setEvents((prev) => prev.filter((x) => x.id !== editingId));
    setIsOpen(false);
  };

  const handleEventDrop = async (info: any) => {
    try {
      setUpdating(true);
      // Para all-day, FullCalendar fornece startStr/endStr como 'YYYY-MM-DD'
      const startStr = (info.event.startStr || "").slice(0, 10);
      const endStr = info.event.endStr ? info.event.endStr.slice(0, 10) : null;
      const startIso = parseFromLocalInput(startStr, true);
      const endIso = endStr ? parseFromLocalInput(endStr, true) : null;
      // Atualiza localmente (otimista)
      setEvents((prev) =>
        prev.map((e) =>
          e.id === info.event.id
            ? { ...e, start: startIso || e.start, end: endIso }
            : e
        )
      );
      // Agenda persistência com debounce
      setPendingChange({
        id: info.event.id,
        start: startIso as string,
        end: (endIso as string) ?? null,
      });
    } catch (e) {
      info.revert();
      setError((e as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  const handleEventResize = async (info: any) => {
    try {
      setUpdating(true);
      const startStr = (info.event.startStr || "").slice(0, 10);
      const endStr = info.event.endStr ? info.event.endStr.slice(0, 10) : null;
      const startIso = parseFromLocalInput(startStr, true);
      const endIso = endStr ? parseFromLocalInput(endStr, true) : null;
      setEvents((prev) =>
        prev.map((e) =>
          e.id === info.event.id
            ? { ...e, start: startIso || e.start, end: endIso }
            : e
        )
      );
      setPendingChange({
        id: info.event.id,
        start: startIso as string,
        end: (endIso as string) ?? null,
      });
    } catch (e) {
      info.revert();
      setError((e as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  const toIsoAllDay = (d: Date | null) => {
    if (!d) return null;
    // Âncora às 12:00 local para evitar shift de fuso (UTC-3 virando dia anterior)
    const local = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
    return local.toISOString();
  };

  const uiEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: formatToLocalInput(e.start, true), // YYYY-MM-DD
    end: e.end ? formatToLocalInput(e.end, true) : undefined, // YYYY-MM-DD
    allDay: true,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Agenda Tributária</h1>
        </div>
        <button
          onClick={() => openCreateAt(new Date().toISOString(), false)}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FiPlus className="h-4 w-4" /> Novo evento
        </button>
      </header>

      <main className="flex-1 p-4 md:p-6">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-sm text-gray-500">Carregando…</div>
        ) : (
          <div className="rounded-xl border bg-white p-3 shadow-sm">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={toolbar}
              height="850px"
              dayMaxEventRows={true}
              selectable
              editable={true}
              eventStartEditable={true}
              eventDurationEditable={true}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              events={uiEvents}
              locales={[ptBrLocale]}
              locale="pt-br"
              timeZone="America/Sao_Paulo"
              buttonText={{ today: "Hoje", month: "Mês", week: "Semana" }}
              titleFormat={{ year: "numeric", month: "long" }}
              dayHeaderFormat={{ weekday: "short", day: "2-digit", month: "2-digit" }}
              eventDisplay="block"
              eventClassNames={() =>
                "rounded-md border bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 text-xs font-medium"
              }
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              firstDay={1}
            />
            <style jsx global>{`
              .fc .fc-toolbar-title {
                font-weight: 600;
              }
              .fc .fc-button {
                background: #1f2a37;
                border: 0;
              }
              .fc .fc-button:hover {
                background: #111827;
              }
              .fc .fc-button-primary:not(:disabled).fc-button-active,
              .fc .fc-button-primary:not(:disabled):active {
                background: #0b1220;
                border: 0;
              }
              .fc .fc-daygrid-day-number {
                font-weight: 500;
                color: #374151;
              }
              .fc .fc-col-header-cell {
                background: #f9fafb;
              }
              .fc-theme-standard .fc-scrollgrid {
                border-color: #e5e7eb;
              }
            `}</style>
          </div>
        )}
      </main>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold">
                {editingId ? "Editar evento" : "Novo evento"}
              </h3>
              <form onSubmit={handleSave} className="mt-4 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="title" className="text-sm font-medium">Título</label>
                  <input
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex.: Pagamento DAS, DCTFWeb, IRPJ, etc."
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="description" className="text-sm font-medium">Descrição</label>
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detalhes, tributo, observações"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="start" className="text-sm font-medium">
                      Início (data)
                    </label>
                    <input
                      id="start"
                      required
                      type="date"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="end" className="text-sm font-medium">
                      Fim (opcional)
                    </label>
                    <input
                      id="end"
                      type="date"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      Excluir
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? "Salvando…" : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Helpers
 * Converte ISO -> valor para <input type="date|datetime-local">
 * e o inverso respeitando allDay (zera a hora em local) e retorna ISO UTC.
 */
function formatToLocalInput(iso: string, allDay: boolean) {
  if (!iso) return "";
  // Se vier como 'YYYY-MM-DD', retorna direto para evitar shift de fuso
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return iso;
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  if (allDay) {
    // yyyy-MM-dd (usa a data local)
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day}T${hh}:${mm}`;
}

function parseFromLocalInput(input: string, allDay: boolean) {
  if (!input) return new Date().toISOString();
  if (allDay) {
    // Âncora às 12:00 (meio-dia) local para evitar regressão de dia ao converter para UTC
    const [y, m, d] = input.split("-").map(Number);
    const local = new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0);
    return local.toISOString();
  }
  const local = new Date(input);
  return local.toISOString();
}