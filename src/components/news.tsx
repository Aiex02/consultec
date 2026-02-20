"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaNewspaper, FaCalendarAlt, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import type { AgendaItem } from "@/app/api/agenda/route";

/* ── Tempo relativo ── */
function tempoRelativo(iso: string): string {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const dias = Math.floor(diff / 86400000);
    if (dias === 0) return "Hoje";
    if (dias === 1) return "Ontem";
    if (dias < 7) return `${dias}d atrás`;
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  } catch {
    return "";
  }
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm animate-pulse">
      <div className="h-1 w-full bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded-full" />
          <div className="h-3 w-14 bg-gray-100 rounded-full" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ── Card de notícia ── */
function NoticiaCard({ item, index }: { item: AgendaItem; index: number }) {
  const colors = [
    { from: "#ec4899", to: "#8b5cf6" },
    { from: "#8b5cf6", to: "#3b82f6" },
    { from: "#f97316", to: "#ec4899" },
    { from: "#06b6d4", to: "#8b5cf6" },
    { from: "#10b981", to: "#3b82f6" },
    { from: "#ec4899", to: "#ef4444" },
  ];
  const c = colors[index % colors.length];

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Barra gradiente topo */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${c.from}, ${c.to})` }} />

      <div className="flex flex-col flex-1 p-5">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <FaCalendarAlt className="w-2.5 h-2.5" />
            <span>{tempoRelativo(item.data)}</span>
          </div>
          {item.assunto && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${c.from}18`, color: c.from }}>
              {item.assunto}
            </span>
          )}
        </div>

        {/* Título */}
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-pink-600 transition-colors flex-1 line-clamp-3">
          {item.titulo}
        </h3>

        {/* Descrição */}
        {item.descricao && item.descricao !== item.titulo && (
          <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {item.descricao}
          </p>
        )}

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaNewspaper className="w-2.5 h-2.5" />
            Receita Federal
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all" style={{ color: c.from }}>
            Ler mais <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════ */
export default function NewsCarousel() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/agenda");
        if (!res.ok) throw new Error();
        const data = await res.json();
        // Mostra apenas as 6 mais recentes
        setItems((data.items ?? []).slice(0, 6));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="text-center py-16">
        <FaNewspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Notícias indisponíveis no momento.</p>
        <p className="text-gray-400 text-sm mt-1">Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid 6 notícias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <NoticiaCard key={item.link} item={item} index={i} />
        ))}
      </div>

      {/* Botão Ver mais */}
      <div className="mt-20 text-center">
        <Link
          href="/noticias"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white font-bold shadow-xl shadow-pink-500/20 hover:-translate-y-1 hover:shadow-pink-500/40 transition-all text-sm sm:text-base"
        >
          <FaNewspaper className="w-4 h-4" />
          Ver todas as notícias
          <FaArrowRight className="w-3.5 h-3.5" />
        </Link>
        <p className="mt-4 text-xs text-gray-400">
          📡 Atualizado automaticamente via RSS da{" "}
          <a href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-medium">
            Receita Federal
          </a>
        </p>
      </div>
    </div>
  );
}
