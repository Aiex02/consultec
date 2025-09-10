'use client';
import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaExternalLinkAlt } from "react-icons/fa";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  source_url: string;
  created_at: string;
};

function NewsCarousel() {
  const supabase = createClientComponentClient();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    setDragging(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseLeave = () => {
    isDownRef.current = false;
    setDragging(false);
  };

  const onMouseUp = () => {
    isDownRef.current = false;
    setDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('news')
        .select('id, title, description, source_url, created_at')
        .order('created_at', { ascending: false })
        .limit(9);
      if (error) setError(error.message);
      setItems(data || []);
      setLoading(false);
    };
    fetchNews();
  }, [supabase]);

  if (loading) {
    return <div className="text-sm text-gray-500">Carregando notícias…</div>;
  }

  if (error) {
    return <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-sm text-gray-500">Nenhuma notícia cadastrada ainda.</div>;
  }

  return (
    <div
      ref={scrollerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={`flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-1 max-w-7xl mx-auto ${
        dragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
    >
      {items.map((n) => (
        <article
          key={n.id}
          className="snap-start shrink-0 w-80 sm:w-[28rem] relative flex flex-col justify-between rounded-none border border-gray-300 bg-white p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md hover:-translate-y-0.5 font-serif h-[420px]"
        >
          <div className="mb-4 border-b border-gray-300 pb-2 text-xs uppercase tracking-wider text-gray-500">
            Manchete
          </div>

          <h3 className="text-xl sm:text-2xl font-bold leading-snug text-gray-900 mb-3 group-hover:text-gray-700 line-clamp-2">
            {n.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 line-clamp-4">
            {n.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-600">
            <span>
              {new Date(n.created_at).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric' })}
            </span>
            <a
              href={n.source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-pink-700 hover:underline"
            >
              Saiba mais <FaExternalLinkAlt className="h-4 w-4" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default NewsCarousel;
