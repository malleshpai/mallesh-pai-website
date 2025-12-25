import { FileText } from 'lucide-react';

export default function CVPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-serif font-bold text-[var(--color-nw-purple)] mb-8">Curriculum Vitae</h1>

            {/* Google Scholar link */}
            <p className="mb-6 text-slate-600">
                Also see my <a href="http://scholar.google.com/citations?user=dHU6M_4AAAAJ" className="text-[var(--color-nw-purple)] underline decoration-1 underline-offset-4 hover:text-[var(--color-nw-purple-deep)]">Google Scholar Profile</a>.
            </p>

            {/* PDF Embed */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <object
                    data="/MalleshPai-CV.pdf"
                    type="application/pdf"
                    width="100%"
                    height="800"
                    className="w-full"
                >
                    <div className="p-8 text-center">
                        <FileText size={48} className="text-[var(--color-nw-purple-light)] mx-auto mb-4" />
                        <p className="text-slate-600 mb-4">
                            Your browser doesn't support embedded PDFs.
                        </p>
                        <a
                            href="/MalleshPai-CV.pdf"
                            className="text-[var(--color-nw-purple)] underline"
                        >
                            Click here to download the PDF
                        </a>
                    </div>
                </object>
            </div>
        </div>
    );
}
