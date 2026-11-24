export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
        <p>&copy; {new Date().getFullYear()} Mallesh M. Pai</p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:mallesh.pai@gmail.com"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Email
          </a>
          <a
            href="https://scholar.google.com/citations?user=dHU6M_4AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Google Scholar
          </a>
          <a
            href="https://twitter.com/malleshpai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            X / Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/malleshpai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
