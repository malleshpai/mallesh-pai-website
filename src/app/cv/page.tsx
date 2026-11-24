import { FileText, ArrowUpRight } from "lucide-react";

export default function CVPage() {
  return (
    <div className="py-10 md:py-14">
      <header className="pb-8 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-medium tracking-[-0.02em] text-[var(--ink)]">
            Curriculum Vitae
          </h1>
          <p className="mt-3 text-[0.96rem] text-[var(--ink-body)]">
            Also see my{" "}
            <a
              href="https://scholar.google.com/citations?user=dHU6M_4AAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Google Scholar profile
            </a>
            .
          </p>
        </div>

        <a
          href="/MalleshPai-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors self-start sm:self-auto"
        >
          <span>Open PDF in new tab</span>
          <ArrowUpRight size={15} />
        </a>
      </header>

      <div className="mt-8 bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_8px_30px_-16px_rgba(22,22,20,0.1)]">
        <object
          data="/MalleshPai-CV.pdf"
          type="application/pdf"
          width="100%"
          height="860"
          className="w-full block"
        >
          <div className="p-12 text-center">
            <FileText
              size={40}
              strokeWidth={1.5}
              className="text-[var(--ink-muted)] mx-auto mb-4"
            />
            <p className="text-[var(--ink-body)] mb-4">
              Your browser doesn&apos;t support embedded PDFs.
            </p>
            <a
              href="/MalleshPai-CV.pdf"
              className="prose-link text-sm font-medium"
            >
              Open the CV PDF directly
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
