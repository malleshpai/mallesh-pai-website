"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, FileText, ExternalLink, Trophy } from 'lucide-react';

interface Author {
  name: string;
  url?: string | null;
}

interface PaperLink {
  text: string;
  url: string;
}

interface PaperProps {
  title: string;
  authors: Author[];
  status: string;
  url?: string | null;
  abstract?: string;
  links?: PaperLink[];
  award?: string;
}

export default function PaperEntry({ title, authors, status, url, abstract, links, award }: PaperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDetails = abstract || (links && links.length > 0);

  return (
    <div className="mb-10 group border-b border-slate-100 pb-8 last:border-0">
      <div
        className={`cursor-pointer transition-opacity ${hasDetails ? 'hover:opacity-80' : ''}`}
        onClick={() => hasDetails && setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-[1.15rem] font-serif font-medium mb-2 group-hover:text-[var(--color-nw-purple)] transition-colors leading-snug text-slate-900">
            {title}
          </h3>
          {hasDetails && (
            <span className="text-slate-300 group-hover:text-[var(--color-nw-purple-light)] transition-colors ml-4 mt-1">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          )}
        </div>

        <div className="text-slate-600 mb-2 leading-relaxed font-light text-[0.95rem]">
          {authors.length > 0 && <span>with </span>}
          {authors.map((author, index) => (
            <span key={index}>
              {author.url ? (
                <a
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-nw-purple)] transition-colors border-b border-transparent hover:border-[var(--color-nw-purple-light)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {author.name}
                </a>
              ) : (
                author.name
              )}
              {index < authors.length - 1 ? (index === authors.length - 2 ? " and " : ", ") : ""}
            </span>
          ))}
        </div>

        <div className="text-sm text-slate-500 italic font-light tracking-wide">
          {status}
        </div>

        {award && (
          <div className="flex items-center gap-2 mt-2 text-sm text-amber-600 font-medium">
            <Trophy className="w-4 h-4" />
            <span>{award}</span>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {abstract && (
            <p className="text-slate-600 leading-loose font-light text-sm mb-6 bg-slate-50 p-6 rounded-sm border-l-2 border-[var(--color-nw-purple-light)]">
              <span className="block font-medium text-xs uppercase tracking-wider text-slate-400 mb-2">Abstract</span>
              {abstract}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            {url && (
              <Link
                href={url}
                target="_blank"
                className="flex items-center space-x-2 text-sm font-medium text-[var(--color-nw-purple)] hover:text-[var(--color-nw-purple-deep)] transition-colors"
              >
                <FileText size={16} />
                <span>View Paper</span>
              </Link>
            )}
            {links && links.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                target="_blank"
                className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-[var(--color-nw-purple)] transition-colors"
              >
                <ExternalLink size={16} />
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
