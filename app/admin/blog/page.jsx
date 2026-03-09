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
        <div className="min-h-screen bg-stone-50">
            <AdminNav />
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-stone-900">Blog Posts</h1>
                    <Link
                        href="/admin/blog/new"
                        className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
                    >
                        New Post
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    {["all", "published", "draft"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                filter === f ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
                            }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                    {clusters.length > 0 && (
                        <select
                            value={clusterFilter}
                            onChange={e => setClusterFilter(e.target.value)}
                            className="px-3 py-1.5 rounded-lg text-sm border border-stone-200 bg-white text-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-400"
                        >
                            <option value="">All clusters</option>
                            {clusters.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-stone-50 border-b border-stone-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Title</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Keyword</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Cluster</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Stage</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Author</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Date</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 text-stone-400">No posts found</td>
                                </tr>
                            )}
                            {filtered.map(post => (
                                <tr key={post._id} className="hover:bg-stone-50">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-stone-900 max-w-[240px] truncate">{post.title}</div>
                                        <div className="text-stone-400 text-xs mt-0.5">/blogs/{post.slug}</div>
                                    </td>
                                    <td className="px-4 py-3 text-stone-600 max-w-[160px] truncate">{post.target_keyword ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-500 max-w-[140px] truncate">{post.cluster ?? "—"}</td>
                                    <td className="px-4 py-3">
                                        {post.funnel_stage && (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${FUNNEL_COLORS[post.funnel_stage] || "bg-stone-100 text-stone-600"}`}>
                                                {post.funnel_stage}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-stone-500">{post.author}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                            post.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-600"
                                        }`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-stone-400 text-xs">
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString()
                                            : new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/blog/${post._id}`}
                                                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => togglePublish({ id: post._id })}
                                                className="text-stone-500 hover:text-stone-700 text-xs font-medium"
                                            >
                                                {post.status === "published" ? "Unpublish" : "Publish"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm("Delete this post?")) removePost({ id: post._id });
                                                }}
                                                className="text-red-500 hover:text-red-700 text-xs font-medium"
                                            >
                                                Delete
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
