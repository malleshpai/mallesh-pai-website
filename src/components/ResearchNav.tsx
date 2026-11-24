"use client";

import { useEffect, useState } from "react";

export interface ResearchSectionItem {
  id: string;
  label: string;
  shortLabel: string;
  count?: number;
}

export default function ResearchNav({
  sections,
}: {
  sections: ResearchSectionItem[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-90px 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Mobile Horizontal Jump Bar */}
      <nav
        aria-label="Research sections"
        className="lg:hidden -mx-6 px-6 pb-4 mb-6 border-b border-[var(--border)] overflow-x-auto"
      >
        <div className="flex items-center gap-2 min-w-max">
          {sections.map((section) => {
            const active = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? "bg-[var(--ink)] text-white"
                    : "bg-[var(--surface-subtle)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {section.shortLabel}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block lg:col-span-3">
        <nav
          aria-label="On this page"
          className="sticky top-24 pr-4"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-3">
            Contents
          </p>
          <ul className="space-y-1 border-l border-[var(--border)]">
            {sections.map((section) => {
              const active = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex items-center justify-between gap-2 pl-3.5 py-1.5 text-[0.86rem] -ml-[1px] border-l transition-colors ${
                      active
                        ? "border-[var(--accent)] text-[var(--ink)] font-medium"
                        : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[#c8c5bc]"
                    }`}
                  >
                    <span className="truncate">{section.shortLabel}</span>
                    {typeof section.count === "number" && (
                      <span className="text-[11px] tabular-nums text-[var(--ink-muted)]/70">
                        {section.count}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
