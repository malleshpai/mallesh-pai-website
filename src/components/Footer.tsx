export default function Footer() {
    return (
        <footer className="border-t border-slate-100 py-12 mt-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center text-center">
                <div className="mb-4">
                    <span className="text-2xl font-serif font-bold text-[var(--color-nw-purple)]">M</span>
                </div>
                <div className="text-slate-500 text-sm mb-4">
                    <p>&copy; {new Date().getFullYear()} Mallesh M. Pai. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
