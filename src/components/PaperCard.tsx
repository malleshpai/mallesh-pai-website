"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paper } from '@/data/research';
import { ChevronDown, ChevronUp, FileText, Globe, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface PaperCardProps {
    paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-6 flex justify-between items-start focus:outline-none focus:bg-slate-50 transition-colors"
            >
                <div className="flex-1 pr-4">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 leading-tight">
                        {paper.title}
                    </h3>
                    <p className="text-slate-600 mb-1">
                        {paper.authors.join(", ")}
                    </p>
                    <div className="flex items-center text-sm text-slate-500 space-x-4">
                        {paper.journal && (
                            <span className="font-medium text-slate-700">{paper.journal} {paper.year && `(${paper.year})`}</span>
                        )}
                        {!paper.journal && paper.year && (
                            <span>{paper.year}</span>
                        )}
                        {paper.status && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${paper.status === "Working Paper" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                    paper.status === "Published" ? "bg-green-50 text-green-700 border-green-200" :
                                        "bg-slate-100 text-slate-600 border-slate-200"
                                }`}>
                                {paper.status}
                            </span>
                        )}
                    </div>
                </div>
                <div className="text-slate-400 mt-1">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-100 bg-slate-50"
                    >
                        <div className="p-6 pt-4">
                            <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                                <BookOpen size={16} className="mr-2" />
                                Abstract
                            </h4>
                            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                                {paper.abstract}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {paper.links.working_paper && (
                                    <Link
                                        href={paper.links.working_paper}
                                        target="_blank"
                                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <FileText size={16} className="mr-2" />
                                        Working Paper
                                    </Link>
                                )}
                                {paper.links.pdf && (
                                    <Link
                                        href={paper.links.pdf}
                                        target="_blank"
                                        className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <FileText size={16} className="mr-2" />
                                        PDF
                                    </Link>
                                )}
                                {paper.links.url && (
                                    <Link
                                        href={paper.links.url}
                                        target="_blank"
                                        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                                    >
                                        <Globe size={16} className="mr-2" />
                                        Published Version
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
