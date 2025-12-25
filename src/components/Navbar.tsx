import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Research', href: '/research' },
        { name: 'CV', href: '/cv' },
        { name: 'Personal', href: '/personal' },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-[var(--color-nw-purple)] hover:text-[var(--color-nw-purple-deep)] transition-colors">
                        Mallesh M. Pai
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-600 hover:text-[var(--color-nw-purple)] transition-colors text-[15px] font-medium tracking-wide uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <button className="p-2 text-slate-600">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
