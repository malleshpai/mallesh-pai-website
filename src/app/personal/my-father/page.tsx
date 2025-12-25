import { promises as fs } from 'fs';
import path from 'path';

async function getPersonalData() {
    const filePath = path.join(process.cwd(), 'src/data/personal.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function MyFatherPage() {
    const data = await getPersonalData();
    const { title, content } = data.myFather;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-12 border-b border-slate-100 pb-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-nw-purple)] mb-4 leading-tight">
                    {title}
                </h1>
            </div>

            <article className="prose prose-lg prose-slate font-serif max-w-none text-slate-700 leading-loose">
                {content.map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 indent-8 text-lg">
                        {paragraph}
                    </p>
                ))}
            </article>

            <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                <a href="/personal" className="text-[var(--color-nw-purple)] hover:text-[var(--color-nw-purple-deep)] font-medium transition-colors">
                    &larr; Back to Personal
                </a>
            </div>
        </div>
    );
}
