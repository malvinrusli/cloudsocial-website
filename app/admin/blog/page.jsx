"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import AdminNav from "../../components/AdminNav";

const FUNNEL_COLORS = {
    TOFU: "bg-blue-100 text-blue-700",
    MOFU: "bg-amber-100 text-amber-700",
    BOFU: "bg-emerald-100 text-emerald-700",
};

export default function AdminBlogPage() {
    const posts = useQuery(api.posts.listAll) ?? [];
    const togglePublish = useMutation(api.posts.togglePublish);
    const removePost = useMutation(api.posts.remove);

    const [filter, setFilter] = useState("all");
    const [clusterFilter, setClusterFilter] = useState("");

    const clusters = [...new Set(posts.map(p => p.cluster).filter(Boolean))];

    const filtered = posts.filter(p => {
        if (filter !== "all" && p.status !== filter) return false;
        if (clusterFilter && p.cluster !== clusterFilter) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-stone-50/50">
            <AdminNav />
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Authority Content</h1>
                        <p className="text-sm text-stone-500 mt-1">Manage your commercial real estate digital presence.</p>
                    </div>
                    <Link
                        href="/admin/blog/new"
                        className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800 transition-all shadow-sm flex items-center gap-2"
                    >
                        <span className="text-lg">+</span> Create New Post
                    </Link>
                </div>

                {/* Filters Row */}
                <div className="flex items-center justify-between mb-6 bg-white p-2 rounded-2xl border border-stone-200 shadow-sm">
                    <div className="flex gap-1">
                        {["all", "published", "draft"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${filter === f ? "bg-stone-900 text-white shadow-md" : "text-stone-400 hover:text-stone-900 hover:bg-stone-50"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 px-2">
                        {clusters.length > 0 && (
                            <select
                                value={clusterFilter}
                                onChange={e => setClusterFilter(e.target.value)}
                                className="bg-transparent text-xs font-bold text-stone-500 uppercase tracking-widest focus:outline-none cursor-pointer hover:text-stone-900 transition-colors"
                            >
                                <option value="">All clusters</option>
                                {clusters.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        )}
                        <div className="h-4 w-px bg-stone-200" />
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{filtered.length} Posts</span>
                    </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-stone-50 border-b border-stone-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Article</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Strategy</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Metrics</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-20">
                                        <p className="text-stone-400 italic text-sm">No authority posts found in this view.</p>
                                    </td>
                                </tr>
                            )}
                            {filtered.map(post => (
                                <tr key={post._id} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-stone-900 text-sm group-hover:text-stone-700 transition-colors">{post.title}</span>
                                            <span className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-wider">/{post.slug}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${FUNNEL_COLORS[post.funnel_stage] || "bg-stone-100 text-stone-500"}`}>
                                                    {post.funnel_stage || "TOFU"}
                                                </span>
                                                <span className="text-[10px] font-medium text-stone-500 truncate max-w-[120px]">{post.cluster || "—"}</span>
                                            </div>
                                            <span className="text-[10px] text-stone-400 italic font-medium truncate max-w-[150px]">
                                                {post.target_keyword}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-stone-600">{post.monthly_volume || 0} <span className="text-[9px] font-normal text-stone-400">VOL</span></span>
                                            <span className="text-xs font-bold text-stone-600">{post.keyword_difficulty || 0} <span className="text-[9px] font-normal text-stone-400">DIFF</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-2 h-2 rounded-full ${post.status === "published" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-stone-300"}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${post.status === "published" ? "text-emerald-700" : "text-stone-500"}`}>
                                                {post.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={`/blogs/${post.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                                                title="View Live"
                                            >
                                                ↗
                                            </a>
                                            <button
                                                onClick={() => togglePublish({ id: post._id })}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${post.status === "published"
                                                    ? "bg-stone-50 text-stone-400 hover:text-stone-900"
                                                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                                                    }`}
                                                title={post.status === "published" ? "Set to Draft" : "Go Live Now"}
                                            >
                                                {post.status === "published" ? "Draft" : "Publish"}
                                            </button>
                                            <Link
                                                href={`/admin/blog/${post._id}`}
                                                className="px-3 py-1.5 bg-stone-100 text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm("Permanently remove this authority post?")) removePost({ id: post._id });
                                                }}
                                                className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
