import Image from 'next/image';
import Link from 'next/link';
import { Mail, GraduationCap, Twitter, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-8">
      <section className="flex flex-col md:flex-row gap-10 items-start">
        <div className="relative shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-2 border-white ring-1 ring-slate-100 relative">
            <Image
              src="/profile.jpg"
              alt="Mallesh M. Pai"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -z-10 top-4 -right-4 w-32 h-32 bg-[var(--color-nw-purple-light)]/20 rounded-full blur-2xl"></div>
        </div>

        <div className="space-y-6 pt-2 flex-grow">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-nw-purple)] tracking-tight">
            Mallesh M. Pai
          </h1>
          <div className="text-[1.1rem] text-slate-600 font-light leading-loose">
            <p className="mb-4">
              I am a researcher at <a href="https://tempo.xyz/" className="text-slate-800 hover:text-[var(--color-nw-purple)] transition-colors underline decoration-1 underline-offset-4 decoration-slate-300 hover:decoration-[var(--color-nw-purple)]">Tempo Labs</a>.
            </p>
            <p className="mb-4">
              I am also the Lay Family Professor in the <a href="http://economics.rice.edu" className="text-slate-800 hover:text-[var(--color-nw-purple)] transition-colors underline decoration-1 underline-offset-4 decoration-slate-300 hover:decoration-[var(--color-nw-purple)]">Department of Economics</a> at <a href="http://www.rice.edu" className="text-slate-800 hover:text-[var(--color-nw-purple)] transition-colors underline decoration-1 underline-offset-4 decoration-slate-300 hover:decoration-[var(--color-nw-purple)]">Rice University</a> (on leave), and a <a href="https://cepr.org/" className="text-slate-800 hover:text-[var(--color-nw-purple)] transition-colors underline decoration-1 underline-offset-4 decoration-slate-300 hover:decoration-[var(--color-nw-purple)]">CEPR</a> Research Fellow.
            </p>
          </div>
        </div>

        {/* Social Sidebar */}
        <div className="flex flex-row md:flex-col gap-4 mt-2 pt-2 md:border-l md:border-slate-100 md:pl-6 shrink-0">
          <a href="mailto:mallesh.pai@gmail.com" className="group flex items-center space-x-3 text-slate-400 hover:text-[var(--color-nw-purple)] transition-colors" title="Email">
            <span className="p-2 bg-slate-50 group-hover:bg-purple-50 rounded-full transition-colors">
              <Mail size={20} />
            </span>
            <span className="hidden md:inline text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Email</span>
          </a>
          <a href="https://scholar.google.com/citations?user=dHU6M_4AAAAJ" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 text-slate-400 hover:text-[var(--color-nw-purple)] transition-colors" title="Google Scholar">
            <span className="p-2 bg-slate-50 group-hover:bg-purple-50 rounded-full transition-colors">
              <GraduationCap size={20} />
            </span>
            <span className="hidden md:inline text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Scholar</span>
          </a>
          <a href="https://twitter.com/malleshpai" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 text-slate-400 hover:text-[var(--color-nw-purple)] transition-colors" title="Twitter">
            <span className="p-2 bg-slate-50 group-hover:bg-purple-50 rounded-full transition-colors">
              <Twitter size={20} />
            </span>
            <span className="hidden md:inline text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Twitter</span>
          </a>
          <a href="https://www.linkedin.com/in/malleshpai" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 text-slate-400 hover:text-[var(--color-nw-purple)] transition-colors" title="LinkedIn">
            <span className="p-2 bg-slate-50 group-hover:bg-purple-50 rounded-full transition-colors">
              <Linkedin size={20} />
            </span>
            <span className="hidden md:inline text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">LinkedIn</span>
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-semibold text-[var(--color-nw-purple)]">Research Interests</h2>
        <p className="text-slate-700 leading-relaxed">
          My research focuses on mechanism design and auction theory, and their applications to the design of blockchains and decentralized finance (DeFi) protocols. I have also worked on the economics of privacy, social networks, social learning, and statistical decision theory.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-semibold text-[var(--color-nw-purple)]">Background</h2>
        <div className="text-slate-700 leading-relaxed space-y-4">
          <p>
            Prior to joining Rice, I was a Janice and Julian Bers Assistant Professor in the Department of Economics at the University of Pennsylvania.
          </p>
          <p>
            I hold a PhD in Managerial Economics and Strategy from the <a href="http://www.kellogg.northwestern.edu/" className="hover:text-[var(--color-nw-purple)]">Kellogg School of Management</a>, Northwestern University, and a Bachelor's degree in Computer Science and Engineering from the <a href="http://www.iitd.ernet.in" className="hover:text-[var(--color-nw-purple)]">Indian Institute of Technology, Delhi</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
