"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaSearch,
  FaInfoCircle,
  FaNewspaper,
  FaSyncAlt,
  FaFilter,
} from "react-icons/fa";
import type { AgendaItem } from "@/app/api/agenda/route";

function formatData(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function tempoRelativo(iso: string): string {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const dias = Math.floor(diff / 86400000);
    if (dias === 0) return "Hoje";
    if (dias === 1) return "Ontem";
    if (dias < 7) return `${dias} dias atrás`;
    if (dias < 30) return `${Math.floor(dias / 7)} semana(s) atrás`;
    return `${Math.floor(dias / 30)} mês(es) atrás`;
  } catch {
    return "";
  }
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="flex gap-3 mb-3">
        <div className="h-4 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-24 bg-gray-100 rounded-full" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-3/4" />
      </div>
    </div>
  );
}

function NoticiaCard({ item, index }: { item: AgendaItem; index: number }) {
  const gradients = [
    { from: "#ec4899", to: "#8b5cf6" },
    { from: "#8b5cf6", to: "#3b82f6" },
    { from: "#f97316", to: "#ec4899" },
    { from: "#06b6d4", to: "#8b5cf6" },
    { from: "#10b981", to: "#3b82f6" },
  ];
  const g = gradients[index % gradients.length];

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${g.from}, ${g.to})` }}
      />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaCalendarAlt className="w-3 h-3" />
            {formatData(item.data)}
          </span>
          <span className="text-gray-200">•</span>
          <span className="text-xs text-gray-400">{tempoRelativo(item.data)}</span>
          {item.assunto && (
            <>
              <span className="text-gray-200">•</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${g.from}15`, color: g.from }}
              >
                {item.assunto}
              </span>
            </>
          )}
        </div>
        <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug mb-2 group-hover:text-pink-600 transition-colors flex-1">
          {item.titulo}
        </h3>
        {item.descricao && item.descricao !== item.titulo && (
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
            {item.descricao}
          </p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <FaNewspaper className="w-3 h-3" />
            Receita Federal
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
            style={{ color: g.from }}
          >
            Ler mais <FaExternalLinkAlt className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Noticias() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState("");
  const [periodo, setPeriodo] = useState<"todos" | "7d" | "30d">("todos");

  async function carregar() {
    setLoading(true);
    setErro(false);
    try {
      const res = await fetch("/api/agenda");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  const filtrados = items.filter((item) => {
    if (periodo !== "todos") {
      const dias = (Date.now() - new Date(item.data).getTime()) / 86400000;
      if (periodo === "7d" && dias > 7) return false;
      if (periodo === "30d" && dias > 30) return false;
    }
    if (busca.trim()) {
      const q = busca.toLowerCase();
      return item.titulo.toLowerCase().includes(q) || item.descricao?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-24 pb-16"
        style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0a1628 100%)" }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/70">Notícias</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5 border" style={{ background: "rgba(139,92,246,0.15)", borderColor: "rgba(139,92,246,0.3)", color: "#c4b5fd" }}>
                <FaCalendarAlt className="w-3.5 h-3.5" />
                Fonte: Receita Federal do Brasil
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
                Notícias<br />
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Tributárias {new Date().getFullYear()}</span>
              </h1>
              <p className="text-white/55 text-base sm:text-lg max-w-xl">
                Notícias e atualizações fiscais em tempo real, diretamente do portal oficial da Receita Federal do Brasil.
              </p>
            </div>
            {!loading && !erro && (
              <div className="flex-shrink-0 rounded-2xl p-6 min-w-[200px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Publicações</p>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">{filtrados.length}</p>
                <p className="text-white/40 text-xs mt-1">Atualizado automaticamente</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Controles */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input type="text" placeholder="Buscar por palavra-chave..." value={busca} onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50" />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <FaFilter className="text-gray-400 w-3.5 h-3.5" />
                {([{ v: "todos", l: "Todos" }, { v: "30d", l: "30 dias" }, { v: "7d", l: "7 dias" }] as const).map((opt) => (
                  <button key={opt.v} onClick={() => setPeriodo(opt.v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${periodo === opt.v ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {opt.l}
                  </button>
                ))}
              </div>
              <button onClick={carregar} disabled={loading} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 flex-shrink-0">
                <FaSyncAlt className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                Atualizar
              </button>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : erro ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <FaNewspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Não foi possível carregar as publicações.</p>
              <button onClick={carregar} className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-semibold">Tentar novamente</button>
            </div>
          ) : filtrados.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <FaSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Nenhuma publicação encontrada.</p>
              <button onClick={() => { setBusca(""); setPeriodo("todos"); }} className="mt-4 text-pink-500 text-sm font-medium hover:underline">Limpar filtros</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtrados.map((item, i) => <NoticiaCard key={item.link} item={item} index={i} />)}
              </div>
              <div className="mt-10 text-center">
                <p className="text-xs text-gray-400">
                  📡 Conteúdo atualizado automaticamente via RSS da{" "}
                  <a href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias/ultimas-noticias" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-medium">Receita Federal do Brasil</a>. Cache renovado a cada hora.
                </p>
              </div>
            </>
          )}

          <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5 flex gap-4">
            <FaInfoCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">Fonte oficial</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Informações fornecidas pelo portal oficial da{" "}
                <a href="https://www.gov.br/receitafederal/pt-br" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 font-medium">Receita Federal do Brasil</a>.
                Consulte sempre um profissional de contabilidade.{" "}
                <Link href="/#contato" className="underline hover:text-blue-900 font-medium">Fale com nossa equipe.</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
