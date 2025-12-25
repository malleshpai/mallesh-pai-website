interface CourseProps {
    code: string;
    title: string;
    description: string;
}

export default function CourseEntry({ code, title, description }: CourseProps) {
    return (
        <div className="mb-8 p-6 bg-white border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-lg font-bold text-[var(--color-nw-purple)]">{code}: {title}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-light">
                {description}
            </p>
        </div>
    );
}
