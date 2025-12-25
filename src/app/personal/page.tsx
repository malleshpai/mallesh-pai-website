import Link from 'next/link';

export default function PersonalPage() {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-[var(--color-nw-purple)] mb-8">Personal</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/personal/my-father" className="group block bg-white border border-slate-100 p-8 rounded shadow-sm hover:shadow-md transition-all hover:border-[var(--color-nw-purple-light)]">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 group-hover:text-[var(--color-nw-purple)] mb-4 transition-colors">
                        My Father
                    </h2>
                    <p className="text-slate-600 font-light leading-relaxed">
                        A tribute to Panemangalore Madhavaraya Pai (1948 — 2025).
                    </p>
                    <span className="inline-block mt-4 text-sm font-medium text-[var(--color-nw-purple)] group-hover:underline decoration-1 underline-offset-4">
                        Read Tribute &rarr;
                    </span>
                </Link>

                {/* Placeholder for future personal content */}
                <div className="bg-slate-50 border border-slate-100 p-8 rounded relative opacity-75">
                    <h2 className="text-2xl font-serif font-bold text-slate-400 mb-4">
                        More
                    </h2>
                    <p className="text-slate-500 font-light leading-relaxed">
                        Other personal writings and musings coming soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
