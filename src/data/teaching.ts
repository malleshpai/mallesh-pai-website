export interface Course {
    id: string;
    title: string;
    code: string;
    role: string;
    year: string;
    description?: string;
    link?: string;
}

export const teaching: Course[] = [
    {
        id: "econ-101",
        title: "Microeconomics",
        code: "ECON 101",
        role: "Instructor",
        year: "2023-2024",
        description: "Introductory microeconomics..."
    }
];
