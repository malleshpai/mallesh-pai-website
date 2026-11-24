import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Mail, GraduationCap, ArrowUpRight, ArrowRight } from "lucide-react";

interface Author {
  name: string;
  url?: string | null;
}

interface Paper {
  title: string;
  url?: string | null;
  status: string;
  authors: Author[];
}

interface ResearchCategory {
  category: string;
  papers: Paper[];
}

interface RecentPaper extends Paper {
  tag: string;
}

const RECENT_PAPER_CONFIG: Array<{ titleMatch: string; tag: string }> = [
  { titleMatch: "The Geography of (Concurrent) Block Proposing", tag: "FC 2027" },
  { titleMatch: "Structural Estimation of MEV-Boost Auctions", tag: "JMID" },
  { titleMatch: "Volatility in Prediction Markets", tag: "Working Paper" },
  { titleMatch: "Indirect Persuasion", tag: "JPE 2026" },
  { titleMatch: "Does Your Blockchain Need Multidimensional Transaction Fees?", tag: "FC 2026" },
  { titleMatch: "Latency Advantages in Common-Value Auctions", tag: "FC 2026" },
];

async function getRecentWork(): Promise<RecentPaper[]> {
  try {
    const filePath = path.join(process.cwd(), "src/data/research.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const categories: ResearchCategory[] = JSON.parse(fileContents);
    const allPapers = categories.flatMap((c) => c.papers);

    const selected: RecentPaper[] = [];
    for (const item of RECENT_PAPER_CONFIG) {
      const found = allPapers.find((p) =>
        p.title.toLowerCase().includes(item.titleMatch.toLowerCase())
      );
      if (found) {
        selected.push({ ...found, tag: item.tag });
      }
    }
    return selected;
  } catch {
    return [];
  }
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default async function Home() {
  const recentWork = await getRecentWork();

  return (
    <div className="py-10 md:py-16">
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center pb-14 md:pb-16">
        <div className="md:col-span-7 order-2 md:order-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--ink-muted)] mb-3">
            Tempo Labs &middot; Research
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.025em] text-[var(--ink)] leading-[1.08]">
            Mallesh M. Pai
          </h1>

          <p className="mt-5 text-[1.08rem] sm:text-[1.15rem] leading-[1.75] text-[var(--ink-body)] max-w-xl">
            I am a researcher at{" "}
            <a
              href="https://tempo.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Tempo Labs
            </a>
            , studying mechanism design, auction theory, and the economics of
            blockchains and decentralized finance.
          </p>

          {/* Contact & Profile Links */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <a
              href="mailto:mallesh.pai@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.84rem] font-medium text-[var(--ink)] bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
            >
              <Mail size={14} strokeWidth={1.8} />
              <span>Email</span>
            </a>

            <a
              href="https://scholar.google.com/citations?user=dHU6M_4AAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.84rem] font-medium text-[var(--ink)] bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
            >
              <GraduationCap size={15} strokeWidth={1.8} />
              <span>Google Scholar</span>
            </a>

            <a
              href="https://twitter.com/malleshpai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.84rem] font-medium text-[var(--ink)] bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </a>

            <a
              href="https://www.linkedin.com/in/malleshpai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.84rem] font-medium text-[var(--ink)] bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Studio Portrait */}
        <div className="md:col-span-5 order-1 md:order-2 flex md:justify-end">
          <div className="relative w-56 sm:w-64 md:w-full md:max-w-[290px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#e5e4e2] ring-1 ring-black/[0.07] shadow-[0_14px_40px_-16px_rgba(22,22,20,0.16)]">
            <Image
              src="/profile.jpg"
              alt="Mallesh M. Pai"
              fill
              sizes="(max-width: 768px) 256px, 290px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-10 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-muted)] md:pt-1.5">
            Research Interests
          </h2>
        </div>
        <div className="md:col-span-9 max-w-2xl">
          <p className="text-[1.02rem] leading-[1.8] text-[var(--ink-body)]">
            My research focuses on mechanism design and auction theory, and their
            applications to the design of blockchains and decentralized finance
            (DeFi) protocols. I have also worked on the economics of privacy,
            social networks, social learning, and statistical decision theory.
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="py-10 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-muted)] md:pt-1.5">
            Background
          </h2>
        </div>
        <div className="md:col-span-9 max-w-2xl space-y-4 text-[1.02rem] leading-[1.8] text-[var(--ink-body)]">
          <p>
            Before joining{" "}
            <a
              href="https://tempo.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Tempo Labs
            </a>
            , I was the Lay Family Professor in the{" "}
            <a
              href="https://economics.rice.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Department of Economics
            </a>{" "}
            at{" "}
            <a
              href="https://www.rice.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Rice University
            </a>
            , a research advisor at{" "}
            <a
              href="https://www.paradigm.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Paradigm
            </a>
            , and a mechanism designer at{" "}
            <a
              href="https://www.smg.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Special Mechanisms Group
            </a>
            , a division of{" "}
            <a
              href="https://consensys.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Consensys
            </a>
            .
          </p>
          <p>
            Prior to Rice, I was a Janice and Julian Bers Assistant Professor in
            the Department of Economics at the University of Pennsylvania.
          </p>
          <p>
            I hold a PhD in Managerial Economics and Strategy from the{" "}
            <a
              href="https://www.kellogg.northwestern.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Kellogg School of Management
            </a>
            , Northwestern University, and a Bachelor&apos;s degree in Computer
            Science and Engineering from the{" "}
            <a
              href="https://home.iitd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link"
            >
              Indian Institute of Technology, Delhi
            </a>
            .
          </p>
        </div>
      </section>

      {/* Recent Work */}
      {recentWork.length > 0 && (
        <section className="py-10 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
          <div className="md:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-muted)] md:pt-1.5">
              Recent Work
            </h2>
          </div>
          <div className="md:col-span-9 max-w-2xl">
            <ul className="divide-y divide-[var(--border)]">
              {recentWork.map((paper, idx) => (
                <li key={idx} className="py-4 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-4">
                    <div className="min-w-0">
                      {paper.url ? (
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group font-serif text-[1.1rem] font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors leading-snug"
                        >
                          <span>{paper.title}</span>
                          <ArrowUpRight
                            size={14}
                            className="inline-block ml-1 align-[-0.1em] text-[var(--ink-muted)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      ) : (
                        <span className="font-serif text-[1.1rem] font-medium text-[var(--ink)] leading-snug">
                          {paper.title}
                        </span>
                      )}
                      {paper.authors.length > 0 && (
                        <p className="text-[0.88rem] text-[var(--ink-muted)] mt-1">
                          with{" "}
                          {paper.authors.map((a, i) => (
                            <span key={i}>
                              {a.name}
                              {i < paper.authors.length - 1
                                ? i === paper.authors.length - 2
                                  ? " and "
                                  : ", "
                                : ""}
                            </span>
                          ))}
                        </p>
                      )}
                      {paper.status && (
                        <p className="text-[0.83rem] text-[var(--ink-body)] italic mt-1">
                          {paper.status.replace(/\.$/, "")}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 self-start text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--ink-muted)] whitespace-nowrap mt-0.5">
                      {paper.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-2">
              <Link
                href="/research"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-deep)] transition-colors"
              >
                <span>View all research</span>
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
