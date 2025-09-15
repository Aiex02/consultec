"use client";

import { useEffect, useMemo, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

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
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  const uiEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: formatToLocalInput(e.start, true),
    end: e.end ? formatToLocalInput(e.end, true) : undefined,
    allDay: true,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Agenda Tributária</h1>
        </div>
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
              selectable={false}
              editable={false}
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
              firstDay={1}
            />
            <style jsx global>{`
              .fc .fc-toolbar-title {
                font-weight: 600;
              }
              .fc .fc-button {
                background: #4740DE;
                border: 0;
              }
              .fc .fc-button:hover {
                background: #4740DE;
              }
              .fc .fc-button-primary:not(:disabled).fc-button-active,
              .fc .fc-button-primary:not(:disabled):active {
                background: #4671E0;
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

      <Footer />
    </div>
  );
}

/** Helpers
 * Converte ISO -> valor para <input type="date|datetime-local">
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