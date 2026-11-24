import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface InlineLink {
  text: string;
  href: string;
}

type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string; links?: InlineLink[] }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stage"; text: string }
  | { type: "dialogue"; speaker: string; text: string };

interface PersonalArticle {
  slug: string;
  title: string;
  eyebrow?: string;
  date: string;
  excerpt: string;
  xUrl?: string;
  format?: "essay" | "play";
  blocks: ArticleBlock[];
}

interface PersonalData {
  articles: PersonalArticle[];
}

async function getPersonalData(): Promise<PersonalData> {
  const filePath = path.join(process.cwd(), "src/data/personal.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const data = await getPersonalData();
  return data.articles.map((article) => ({ slug: article.slug }));
}

function renderLinkedText(text: string, links?: InlineLink[]): ReactNode {
  if (!links || links.length === 0) return text;

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const idx = text.indexOf(link.text, cursor);
    if (idx === -1) continue;

    if (idx > cursor) {
      nodes.push(text.slice(cursor, idx));
    }
    nodes.push(
      <a
        key={`${i}-${idx}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="prose-link"
      >
        {link.text}
      </a>
    );
    cursor = idx + link.text.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes.length > 0 ? nodes : text;
}

export default async function PersonalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPersonalData();
  const article = data.articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const isPlay = article.format === "play";

  return (
    <div className="py-10 md:py-14 max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/personal"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Personal</span>
        </Link>

        {article.xUrl && (
          <a
            href={article.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>Originally on X</span>
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>

      <header className="pb-8 mb-8 border-b border-[var(--border)]">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-3">
          {article.eyebrow ? `${article.eyebrow} · ${article.date}` : article.date}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[var(--ink)] leading-tight">
          {article.title}
        </h1>
      </header>

      <article
        className={
          isPlay
            ? "font-serif text-[1.08rem] leading-[1.85] text-[#2b2a27] space-y-3.5"
            : "font-serif text-[1.12rem] leading-[1.9] text-[#2b2a27] space-y-6"
        }
      >
        {article.blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="font-serif text-xl sm:text-2xl font-medium tracking-[-0.015em] text-[var(--ink)] pt-4"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "quote") {
            return (
              <blockquote
                key={index}
                className="border-l-2 border-[var(--accent)]/40 pl-5 italic text-[var(--ink-body)] my-6"
              >
                {block.text}
              </blockquote>
            );
          }

          if (block.type === "list") {
            return (
              <ul
                key={index}
                className="list-disc pl-6 space-y-2 marker:text-[var(--ink-muted)]"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "stage") {
            return (
              <p
                key={index}
                className="italic text-[var(--ink-muted)] py-2 text-[1rem]"
              >
                {block.text}
              </p>
            );
          }

          if (block.type === "dialogue") {
            return (
              <p key={index}>
                <span className="font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[var(--ink)] mr-2.5">
                  {block.speaker}:
                </span>
                <span>{block.text}</span>
              </p>
            );
          }

          return (
            <p key={index}>{renderLinkedText(block.text, block.links)}</p>
          );
        })}
      </article>

      <div className="mt-14 pt-8 border-t border-[var(--border)] flex items-center justify-between gap-4">
        <Link
          href="/personal"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Personal</span>
        </Link>

        {article.xUrl && (
          <a
            href={article.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>View on X</span>
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
