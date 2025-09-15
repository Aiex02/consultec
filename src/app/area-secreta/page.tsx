"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiExternalLink, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

// Modelo de dados da tabela `news` no Supabase:
// id: uuid (pk, default uuid_generate_v4())
// title: text
// description: text
// source_url: text
// created_at: timestamp with time zone (default now())

export default function AreaSecretaPage() {
  const supabase = createClientComponentClient();

  const [news, setNews] = useState<
    Array<{
      id: string;
      title: string;
      description: string;
      source_url: string;
      created_at: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<{
    id: string;
    title: string;
    description: string;
    source_url: string;
  } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("news")
        .select("id, title, description, source_url, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setNews(data || []);
      }
      setLoading(false);
    };

    fetchNews();
  }, [supabase]);

  const openModal = () => {
    setTitle("");
    setDescription("");
    setSourceUrl("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setTitle("");
    setDescription("");
    setSourceUrl("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { data, error } = await supabase
      .from("news")
      .insert({ title, description, source_url: sourceUrl })
      .select("id, title, description, source_url, created_at")
      .single();

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data) {
      setNews((prev) => [data, ...prev]);
      closeModal();
    }
  };

  const openEdit = (n: {
    id: string;
    title: string;
    description: string;
    source_url: string;
  }) => {
    setEditing({
      id: n.id,
      title: n.title,
      description: n.description,
      source_url: n.source_url,
    });
    // Reutilizamos os mesmos campos do formulário de criação
    setTitle(n.title);
    setDescription(n.description);
    setSourceUrl(n.source_url);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError(null);

    const { data, error } = await supabase
      .from("news")
      .update({ title, description, source_url: sourceUrl })
      .eq("id", editing.id)
      .select("id, title, description, source_url, created_at")
      .single();

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data) {
      setNews((prev) => prev.map((x) => (x.id === data.id ? data : x)));
      setEditing(null);
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setSourceUrl("");
    }
  };

  const openDelete = (n: { id: string; title: string }) => {
    setIsDeleteOpen({ id: n.id, title: n.title });
  };

  const confirmDelete = async () => {
    if (!isDeleteOpen) return;
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", isDeleteOpen.id);
    if (error) {
      setError(error.message);
      return;
    }
    setNews((prev) => prev.filter((x) => x.id !== isDeleteOpen.id));
    setIsDeleteOpen(null);
  };

  return (
    <>
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold">Notícias</h1>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FiPlus className="h-4 w-4" /> Nova notícia
        </button>
      </header>

      <section className="p-6">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-gray-500">Carregando…</div>
        ) : news.length === 0 ? (
          <div className="text-sm text-gray-500">
            Nenhuma notícia cadastrada ainda.
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <li
                key={n.id}
                className="group rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold leading-tight">
                      {n.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={n.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs text-blue-600 hover:bg-blue-50"
                      title="Abrir fonte"
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => openEdit(n)}
                      className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs hover:bg-gray-50"
                      title="Editar"
                    >
                      <FiEdit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => openDelete(n)}
                      className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      title="Remover"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 line-clamp-4">
                  {n.description}
                </p>
                <div className="mt-1 inline-flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Modal para nova notícia */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold">
                {editing ? "Editar notícia" : "Adicionar notícia"}
              </h3>
              <form
                onSubmit={editing ? handleUpdate : handleCreate}
                className="mt-4 space-y-4"
              >
                <div className="space-y-1">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título
                  </label>
                  <input
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex.: Lançamento de novo recurso"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Resumo da notícia"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="source" className="text-sm font-medium">
                    Link da fonte
                  </label>
                  <input
                    id="source"
                    type="url"
                    required
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://exemplo.com/noticia"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving
                      ? "Salvando…"
                      : editing
                      ? "Salvar alterações"
                      : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDeleteOpen(null)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold">Remover notícia</h3>
              <p className="mt-2 text-sm text-gray-600">
                Tem certeza que deseja remover{" "}
                <span className="font-medium">{isDeleteOpen.title}</span>? Esta
                ação não pode ser desfeita.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(null)}
                  className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
