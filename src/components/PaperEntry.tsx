"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Award } from "lucide-react";

interface Author {
  name: string;
  url?: string | null;
}

interface PaperLink {
  text: string;
  url: string;
}

interface PaperProps {
  title: string;
  authors: Author[];
  status: string;
  url?: string | null;
  abstract?: string;
  links?: PaperLink[];
  award?: string;
}

function getLinkLabel(url: string, fallback?: string): string {
  const cleanFallback = fallback?.trim() ?? "";
  if (
    cleanFallback &&
    !cleanFallback.startsWith("http") &&
    cleanFallback.toLowerCase() !== "here"
  ) {
    return cleanFallback.replace(/\.$/, "");
  }
  if (url.includes("arxiv.org")) return "arXiv";
  if (url.includes("ssrn.com")) return "SSRN";
  if (url.includes("doi.org")) return "DOI";
  if (url.toLowerCase().endsWith(".pdf")) return "PDF";
  return "Paper";
}

function normalizeUrl(u: string) {
  return u.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase();
}

export default function PaperEntry({
  title,
  authors,
  status,
  url,
  abstract,
  links,
  award,
}: PaperProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasAbstract = Boolean(abstract && abstract.trim().length > 0);
  const isNewTag = status.trim().toLowerCase() === "(new)";
  const cleanStatus = isNewTag ? "" : status.trim().replace(/\s+\.$/, ".");

  // Deduplicate secondary links that point to the exact same destination as url
  const extraLinks = (links ?? []).filter((l) => {
    if (!l.url) return false;
    if (url && normalizeUrl(l.url) === normalizeUrl(url)) return false;
    return true;
  });

  return (
    <article className="py-5 border-b border-[var(--border)] last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h3 className="font-serif text-[1.15rem] font-medium leading-[1.35] text-[var(--ink)]">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:text-[var(--accent)] transition-colors"
              >
                <span>{title}</span>
                <ArrowUpRight
                  size={14}
                  className="inline-block ml-1 align-[-0.1em] text-[var(--ink-muted)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : (
              <span>{title}</span>
            )}
          </h3>

          {/* Co-authors */}
          {authors.length > 0 && (
            <p className="mt-1 text-[0.9rem] text-[var(--ink-muted)] leading-relaxed">
              <span>with </span>
              {authors.map((author, index) => (
                <span key={index}>
                  {author.url ? (
                    <a
                      href={author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ink-body)] hover:text-[var(--accent)] underline decoration-[#d4d1c9] hover:decoration-[var(--accent)] underline-offset-3 transition-colors"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span className="text-[var(--ink-body)]">{author.name}</span>
                  )}
                  {index < authors.length - 1
                    ? index === authors.length - 2
                      ? " and "
                      : ", "
                    : ""}
                </span>
              ))}
            </p>
          )}

          {/* Venue / Status & Award */}
          {(cleanStatus || isNewTag || award) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.86rem]">
              {cleanStatus && (
                <span className="text-[var(--ink-body)] italic">
                  {cleanStatus}
                </span>
              )}
              {isNewTag && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent)]">
                  New
                </span>
              )}
              {award && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.78rem] font-medium bg-amber-50 text-amber-800 border border-amber-200/70">
                  <Award size={12} className="shrink-0" />
                  <span>{award}</span>
                </span>
              )}
            </div>
          )}

          {/* Action chips: Abstract toggle & direct links */}
          {(hasAbstract || url || extraLinks.length > 0) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {hasAbstract && (
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isOpen
                      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "bg-[var(--surface-subtle)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[#eceae3]"
                  }`}
                >
                  <span>Abstract</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] bg-[var(--surface-subtle)] hover:bg-[var(--accent-soft)] transition-colors"
                >
                  <span>{getLinkLabel(url)}</span>
                  <ArrowUpRight size={12} />
                </a>
              )}

              {extraLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] bg-[var(--surface-subtle)] hover:bg-[var(--accent-soft)] transition-colors"
                >
                  <span>{getLinkLabel(link.url, link.text)}</span>
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Abstract */}
      {hasAbstract && (
        <div
          className={`grid transition-all duration-200 ease-out ${
            isOpen
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-[var(--surface-subtle)] border border-[var(--border)] rounded-lg px-5 py-4 text-[0.9rem] leading-[1.75] text-[var(--ink-body)]">
              {abstract}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
