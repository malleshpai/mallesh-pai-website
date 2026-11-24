"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "CV", href: "/cv" },
  { name: "Personal", href: "/personal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-[1.2rem] font-medium tracking-[-0.015em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Mallesh M. Pai
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-[0.9rem] transition-colors ${
                    active
                      ? "text-[var(--ink)] font-medium"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[1px] h-[1.5px] bg-[var(--accent)] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden -mr-2 p-2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="md:hidden border-t border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2.5 text-[0.95rem] border-b border-[var(--border)]/60 last:border-b-0 transition-colors ${
                    active
                      ? "text-[var(--accent)] font-medium"
                      : "text-[var(--ink-body)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
