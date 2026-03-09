"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "Keyword Queue", href: "/admin/queue" },
    { label: "Blog Posts", href: "/admin/blog" },
    { label: "BOFU Pages", href: "/admin/bofu" },
    { label: "Case Studies", href: "/admin/case-studies" },
    { label: "Media", href: "/admin/media" },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="bg-stone-900 border-b border-stone-700">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-1 flex-wrap">
                <span className="text-stone-400 text-sm font-medium mr-4">Admin</span>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-white text-stone-900"
                                    : "text-stone-300 hover:text-white hover:bg-stone-800"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
