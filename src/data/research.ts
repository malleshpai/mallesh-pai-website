export interface Paper {
    id: string;
    title: string;
    authors: string[];
    journal?: string;
    year?: number;
    status?: "Working Paper" | "Published" | "Resting" | "Work in Progress";
    abstract: string;
    links: {
        url?: string; // Link to published version or persistent URL
        pdf?: string; // Link to PDF
        working_paper?: string; // Link to working paper version
    };
}

export const papers: Paper[] = [
    {
        id: "discrimination-audit",
        title: "Discrimination in Audits",
        authors: ["Mallesh Pai", "Example Co-author"],
        year: 2024,
        status: "Working Paper",
        abstract: "We study the problem of discrimination in audit studies...",
        links: {
            pdf: "#",
            working_paper: "#"
        }
    },
    // We will populate this with real data later
];
