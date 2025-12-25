import { promises as fs } from 'fs';
import path from 'path';
import PaperEntry from '@/components/PaperEntry';
import Link from 'next/link';

async function getResearchData() {
    const filePath = path.join(process.cwd(), 'src/data/research.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ResearchPage() {
    const researchData = await getResearchData();

    // Generate section IDs for navigation
    const sections = [
        ...researchData.map((cat: any) => ({
            id: cat.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            label: cat.category
        })),
        { id: 'grants', label: 'Grants' },
        { id: 'service', label: 'Service' }
    ];

    return (
        <div className="flex gap-8 max-w-5xl mx-auto">
            {/* Navigation Sidebar */}
            <nav className="hidden lg:block sticky top-24 self-start w-48 shrink-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">On This Page</h3>
                <ul className="space-y-2 text-sm">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className="text-slate-500 hover:text-[var(--color-nw-purple)] transition-colors block py-1 border-l-2 border-transparent hover:border-[var(--color-nw-purple-light)] pl-3"
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Main Content */}
            <div className="flex-grow max-w-3xl">
                <h1 className="text-4xl font-serif font-bold text-[var(--color-nw-purple)] mb-8">Research</h1>

                <div className="mb-10 text-lg text-slate-600">
                    <p>
                        My Google Scholar profile is <a href="http://scholar.google.com/citations?user=dHU6M_4AAAAJ" className="text-[var(--color-nw-purple)] hover:underline">here</a>.
                        A formal CV and research statement are available on the <a href="/cv" className="text-[var(--color-nw-purple)] hover:underline">CV page</a>.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        My Erdos number is 3 (me → Rakesh Vohra → Daniel Kleitman → Paul Erdos).
                    </p>
                </div>

                <div className="space-y-10">
                    {researchData.map((category: any, index: number) => (
                        <section key={index} id={category.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}>
                            <h2 className="text-2xl font-serif font-semibold text-[var(--color-nw-purple)] mb-6 border-b border-slate-100 pb-2">
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.papers.map((paper: any, pIndex: number) => (
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
                </div>

                {/* Grants Section */}
                <section id="grants" className="mt-16">
                    <h2 className="text-2xl font-serif font-semibold text-[var(--color-nw-purple)] mb-6 border-b border-slate-100 pb-2">
                        Grants
                    </h2>
                    <div className="text-slate-600 leading-relaxed space-y-4">
                        <p>
                            I am presently supported partially by a NSF-CCF grant (joint with{' '}
                            <a href="https://www.cis.upenn.edu/~kannan/" className="text-[var(--color-nw-purple)] hover:underline">Sampath Kannan</a>,{' '}
                            <a href="http://www.cis.upenn.edu/~aaroth/" className="text-[var(--color-nw-purple)] hover:underline">Aaron Roth</a> and{' '}
                            <a href="https://sites.google.com/site/quaerereverum9/" className="text-[var(--color-nw-purple)] hover:underline">Rakesh Vohra</a>)
                            on "The Foundations of Fair Data Analysis."
                        </p>
                        <p>
                            I was previously supported by an NSF-ICES grant (joint with{' '}
                            <a href="https://homes.cs.washington.edu/~sham/" className="text-[var(--color-nw-purple)] hover:underline">Sham Kakade</a>,{' '}
                            <a href="http://www.cis.upenn.edu/~mkearns/" className="text-[var(--color-nw-purple)] hover:underline">Michael Kearns</a> and{' '}
                            <a href="http://www.cis.upenn.edu/~aaroth/" className="text-[var(--color-nw-purple)] hover:underline">Aaron Roth</a>)
                            on "The Economic Foundations of Digital Privacy."
                        </p>
                    </div>
                </section>

                {/* Service Section */}
                <section id="service" className="mt-16">
                    <h2 className="text-2xl font-serif font-semibold text-[var(--color-nw-purple)] mb-6 border-b border-slate-100 pb-2">
                        Service
                    </h2>
                    <div className="text-slate-600 leading-relaxed space-y-4">
                        <p>
                            I've served on the organizing committee for Fairness for Digital Infrastructure Workshop 2017,
                            Texas Theory Conference 2016, New York Computer Science and Economics Day 2011, and Ad Auctions Workshop 2012.
                        </p>
                        <p>
                            I have served on the program committee for ACM Conference on Electronic Commerce and other conferences
                            and workshops in the 'nexus area' between computer science and economics. Most recently, I served as
                            an area chair for EC 2023 and served as a SPC for WINE 23.
                        </p>
                        <p>
                            I've been a referee for, among others: American Economic Review, American Economic Journal: Microeconomics,
                            BE Journal of Theoretical Economics, Econometrica, Economics Bulletin, European Journal of Operations Research,
                            Games and Economic Behavior, International Economic Review, International Journal of Game Theory,
                            Journal of Economic Theory, Journal of Economics and Management Strategy, Journal of Mathematical Economics,
                            Journal of Public Economics, Management Science, Mathematics of Operations Research, Operations Research,
                            Review of Economic Studies, Theoretical Economics and Transactions on Economics and Computation.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
