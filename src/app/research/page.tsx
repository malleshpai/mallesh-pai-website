import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import PaperEntry from "@/components/PaperEntry";
import ResearchNav, { ResearchSectionItem } from "@/components/ResearchNav";

interface Author {
  name: string;
  url?: string | null;
}

interface PaperLink {
  text: string;
  url: string;
}

interface Paper {
  title: string;
  authors: Author[];
  status: string;
  url?: string | null;
  abstract?: string;
  links?: PaperLink[];
  award?: string;
}

interface ResearchCategory {
  category: string;
  papers: Paper[];
}

async function getResearchData(): Promise<ResearchCategory[]> {
  const filePath = path.join(process.cwd(), "src/data/research.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

function toShortLabel(category: string): string {
  if (category === "Papers in Refereed Journals") return "Journal Papers";
  if (category === "Papers in Refereed Conference Proceedings")
    return "Conference Papers";
  return category;
}

function toId(label: string): string {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default async function ResearchPage() {
  const researchData = await getResearchData();

  const sections: ResearchSectionItem[] = [
    ...researchData.map((cat) => ({
      id: toId(cat.category),
      label: cat.category,
      shortLabel: toShortLabel(cat.category),
      count: cat.papers.length,
    })),
    { id: "grants", label: "Grants", shortLabel: "Grants" },
    { id: "service", label: "Service", shortLabel: "Service" },
  ];

  return (
    <div className="py-10 md:py-14">
      {/* Page Header */}
      <header className="pb-8 border-b border-[var(--border)]">
        <h1 className="font-serif text-4xl font-medium tracking-[-0.02em] text-[var(--ink)]">
          Research
        </h1>
        <p className="mt-3 text-[0.98rem] text-[var(--ink-body)] leading-relaxed max-w-2xl">
          My Google Scholar profile is{" "}
          <a
            href="https://scholar.google.com/citations?user=dHU6M_4AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            here
          </a>
          . A formal CV and research statement are available on the{" "}
          <Link href="/cv" className="prose-link">
            CV page
          </Link>
          .
        </p>
        <p className="mt-1.5 text-xs text-[var(--ink-muted)]">
          Erd&#337;s number: 3 (me &rarr; Rakesh Vohra &rarr; Daniel Kleitman
          &rarr; Paul Erd&#337;s)
        </p>
      </header>

      {/* Content Grid */}
      <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-12">
        <ResearchNav sections={sections} />

        <div className="lg:col-span-9 space-y-14">
          {researchData.map((category, index) => (
            <section
              key={index}
              id={toId(category.category)}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[var(--ink)]/15 mb-1">
                <h2 className="font-serif text-2xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                  {category.category}
                </h2>
                <span className="text-xs tabular-nums text-[var(--ink-muted)] shrink-0">
                  {category.papers.length}{" "}
                  {category.category.toLowerCase().includes("patent")
                    ? category.papers.length === 1
                      ? "patent"
                      : "patents"
                    : category.papers.length === 1
                      ? "paper"
                      : "papers"}
                </span>
              </div>

              <div>
                {category.papers.map((paper, pIndex) => (
                  <PaperEntry
                    key={pIndex}
                    title={paper.title}
                    authors={paper.authors}
                    status={paper.status}
                    url={paper.url}
                    abstract={paper.abstract}
                    links={paper.links}
                    award={paper.award}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* Grants */}
          <section id="grants" className="scroll-mt-24">
            <div className="pb-3 border-b border-[var(--ink)]/15 mb-5">
              <h2 className="font-serif text-2xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                Grants
              </h2>
            </div>
            <div className="space-y-4 text-[0.96rem] leading-[1.8] text-[var(--ink-body)]">
              <p>
                I am presently supported partially by an NSF-CCF grant (joint
                with{" "}
                <a
                  href="https://www.cis.upenn.edu/~kannan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Sampath Kannan
                </a>
                ,{" "}
                <a
                  href="https://www.cis.upenn.edu/~aaroth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Aaron Roth
                </a>
                , and{" "}
                <a
                  href="https://sites.google.com/site/quaerereverum9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Rakesh Vohra
                </a>
                ) on &ldquo;The Foundations of Fair Data Analysis.&rdquo;
              </p>
              <p>
                I was previously supported by an NSF-ICES grant (joint with{" "}
                <a
                  href="https://homes.cs.washington.edu/~sham/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Sham Kakade
                </a>
                ,{" "}
                <a
                  href="https://www.cis.upenn.edu/~mkearns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Michael Kearns
                </a>
                , and{" "}
                <a
                  href="https://www.cis.upenn.edu/~aaroth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Aaron Roth
                </a>
                ) on &ldquo;The Economic Foundations of Digital Privacy.&rdquo;
              </p>
            </div>
          </section>

          {/* Service */}
          <section id="service" className="scroll-mt-24">
            <div className="pb-3 border-b border-[var(--ink)]/15 mb-5">
              <h2 className="font-serif text-2xl font-medium tracking-[-0.015em] text-[var(--ink)]">
                Service
              </h2>
            </div>
            <div className="space-y-4 text-[0.96rem] leading-[1.8] text-[var(--ink-body)]">
              <p>
                I&apos;ve served on the organizing committee for Fairness for
                Digital Infrastructure Workshop 2017, Texas Theory Conference
                2016, New York Computer Science and Economics Day 2011, and Ad
                Auctions Workshop 2012.
              </p>
              <p>
                I have served on the program committee for ACM Conference on
                Electronic Commerce and other conferences and workshops in the
                &lsquo;nexus area&rsquo; between computer science and economics.
                Most recently, I served as an area chair for EC 2023 and served
                as an SPC for WINE 23.
              </p>
              <p>
                I&apos;ve been a referee for, among others: American Economic
                Review, American Economic Journal: Microeconomics, BE Journal of
                Theoretical Economics, Econometrica, Economics Bulletin,
                European Journal of Operations Research, Games and Economic
                Behavior, International Economic Review, International Journal
                of Game Theory, Journal of Economic Theory, Journal of Economics
                and Management Strategy, Journal of Mathematical Economics,
                Journal of Public Economics, Management Science, Mathematics of
                Operations Research, Operations Research, Review of Economic
                Studies, Theoretical Economics, and Transactions on Economics
                and Computation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
