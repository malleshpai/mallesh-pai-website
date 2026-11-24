import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PersonalArticle {
  slug: string;
  title: string;
  eyebrow?: string;
  date: string;
  excerpt: string;
  xUrl?: string;
}

interface PersonalData {
  personal: {
    title: string;
    content: string;
  };
  articles: PersonalArticle[];
}

async function getPersonalData(): Promise<PersonalData> {
  const filePath = path.join(process.cwd(), "src/data/personal.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function PersonalPage() {
  const data = await getPersonalData();

  return (
    <div className="py-10 md:py-14 max-w-2xl">
      <header className="pb-8 border-b border-[var(--border)]">
        <h1 className="font-serif text-4xl font-medium tracking-[-0.02em] text-[var(--ink)]">
          Personal
        </h1>
        <p className="mt-3 text-[0.98rem] text-[var(--ink-body)] leading-relaxed">
          {data.personal.content}
        </p>
      </header>

      <div className="divide-y divide-[var(--border)]">
        {data.articles.map((article) => (
          <article key={article.slug} className="py-7">
            <Link href={`/personal/${article.slug}`} className="group block">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-2">
                {article.date}
              </p>
              <h2 className="font-serif text-2xl sm:text-[1.65rem] font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="mt-2.5 text-[0.96rem] leading-[1.75] text-[var(--ink-body)]">
                {article.excerpt}
              </p>
              <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                <span>Read</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
