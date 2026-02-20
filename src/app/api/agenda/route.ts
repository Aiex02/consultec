import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache de 1h

export interface AgendaItem {
  titulo: string;
  descricao: string;
  link: string;
  data: string; // ISO string
  assunto?: string;
}

/* ── Fallback caso o RSS falhe ── */
const FALLBACK_ITEMS: AgendaItem[] = [
  {
    titulo: "Receita Federal – Agenda Tributária oficial",
    descricao: "Acesse a agenda tributária completa no portal oficial da Receita Federal do Brasil.",
    link: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/calendario",
    data: new Date().toISOString(),
    assunto: "Agenda",
  },
];

/* ── Helper: extrai texto de uma tag XML ── */
function extractTag(xml: string, tag: string): string {
  const reSimple = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const mSimple = xml.match(reSimple);
  if (mSimple) return mSimple[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
  return "";
}

export async function GET() {
  const RSS_URL =
    "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/ultimas-noticias/RSS";

  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Consultec/1.0)" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const xml = await res.text();

    /* ── Extrai todos os blocos <item> ── */
    const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

    const items: AgendaItem[] = itemBlocks
      .map((block) => {
        const titulo = extractTag(block, "title");
        const link =
          block.match(/rdf:about="([^"]+)"/)?.[1] ??
          extractTag(block, "link") ??
          "";
        const descricao = extractTag(block, "description");
        const data = extractTag(block, "dc:date");
        const assunto = extractTag(block, "dc:subject");
        const tipo = extractTag(block, "dc:type");

        // Filtra apenas notícias (exclui pastas, imagens, coleções)
        if (
          tipo === "Folder" ||
          tipo === "Collection" ||
          tipo === "Image" ||
          !titulo ||
          !link.includes("/noticias/")
        ) {
          return null;
        }

        return { titulo, descricao: descricao || titulo, link, data, assunto };
      })
      .filter(Boolean) as AgendaItem[];

    if (items.length === 0) {
      return NextResponse.json({ items: FALLBACK_ITEMS, source: "fallback" });
    }

    // Ordena mais recente primeiro
    items.sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    return NextResponse.json({ items: items.slice(0, 30), source: "rss" });
  } catch (err) {
    console.error("[/api/agenda] Erro ao buscar RSS:", err);
    return NextResponse.json({ items: FALLBACK_ITEMS, source: "fallback" });
  }
}
