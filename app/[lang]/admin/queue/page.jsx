"use client";
import { useState } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminNav from "@/app/components/AdminNav";

const STATUS_COLORS = {
    pending: "bg-amber-100 text-amber-800",
    generating: "bg-blue-100 text-blue-800",
    published: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
};

export default function AdminQueuePage() {
    const queueItems = useQuery(api.queue.listQueue) ?? [];
    const addToQueue = useMutation(api.queue.addToQueue);
    const removeFromQueue = useMutation(api.queue.removeFromQueue);
    const triggerGenerate = useAction(api.generate.generateNextPost);
    const triggerDiscover = useAction(api.discover.discoverKeywords);

    const [form, setForm] = useState({
        target_keyword: "",
        monthly_volume: "",
        keyword_difficulty: "",
        word_count_target: "1500",
        funnel_stage: "TOFU",
        cluster: "",
        pillar: "",
        featured_image_prompt: "",
    });
    const [generating, setGenerating] = useState(false);
    const [discovering, setDiscovering] = useState(false);
    const [message, setMessage] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.target_keyword.trim()) return;
        await addToQueue({
            target_keyword: form.target_keyword.trim(),
            monthly_volume: form.monthly_volume ? parseInt(form.monthly_volume) : undefined,
            keyword_difficulty: form.keyword_difficulty ? parseFloat(form.keyword_difficulty) : undefined,
            word_count_target: form.word_count_target ? parseInt(form.word_count_target) : 1500,
            funnel_stage: form.funnel_stage || undefined,
            cluster: form.cluster || undefined,
            pillar: form.pillar || undefined,
            featured_image_prompt: form.featured_image_prompt || undefined,
        });
        setForm({ target_keyword: "", monthly_volume: "", keyword_difficulty: "", word_count_target: "1500", funnel_stage: "TOFU", cluster: "", pillar: "", featured_image_prompt: "" });
        setMessage({ type: "success", text: "Keyword added to queue." });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleGenerate = async () => {
        setGenerating(true);
        setMessage(null);
        try {
            const result = await triggerGenerate({});
            if (result.status === "no_pending") {
                setMessage({ type: "info", text: "No pending keywords in queue. Please add keywords or run discovery first." });
            } else {
                setMessage({
                    type: "success",
                    text: (
                        <div className="flex items-center justify-between gap-4">
                            <span>Drafted: <strong>{result.title}</strong></span>
                            <a
                                href={`/admin/blog/${result.postId}`}
                                className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0"
                            >
                                Edit & Publish →
                            </a>
                        </div>
                    )
                });
            }
        } catch (err) {
            setMessage({ type: "error", text: String(err) });
        } finally {
            setGenerating(false);
        }
    };

    const handleDiscover = async () => {
        setDiscovering(true);
        setMessage(null);
        try {
            const result = await triggerDiscover({});
            setMessage({
                type: "success",
                text: `SEMrush discovery complete. Added ${result.added} keywords to queue for drafting.${result.errors.length ? ` (${result.errors.length} errors)` : ""}`
            });
        } catch (err) {
            setMessage({ type: "error", text: String(err) });
        } finally {
            setDiscovering(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <AdminNav />
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-stone-900">Content Discovery & Queue</h1>
                        <p className="text-sm text-stone-500 mt-1">Research keywords and automate drafting for review.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDiscover}
                            disabled={discovering}
                            className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg text-sm font-bold hover:bg-stone-200 disabled:opacity-50 transition-all border border-stone-200"
                        >
                            {discovering ? "Discovering..." : "Research Keywords (SEMrush)"}
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-bold hover:bg-stone-800 disabled:opacity-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            {generating ? (
                                <>
                                    <span className="w-3 h-3 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
                                    Generating Draft...
                                </>
                            ) : "Generate Next Draft"}
                        </button>
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                        message.type === "error" ? "bg-red-50 text-red-800 border border-red-200" :
                            "bg-blue-50 text-blue-800 border border-blue-200"
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Add keyword form */}
                <form onSubmit={handleAdd} className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
                    <h2 className="text-base font-semibold text-stone-900 mb-4">Add Keyword</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            <label className="block text-xs font-medium text-stone-600 mb-1">Target Keyword *</label>
                            <input
                                type="text"
                                required
                                value={form.target_keyword}
                                onChange={e => setForm(f => ({ ...f, target_keyword: e.target.value }))}
                                placeholder="commercial real estate SEO"
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">Funnel Stage</label>
                            <select
                                value={form.funnel_stage}
                                onChange={e => setForm(f => ({ ...f, funnel_stage: e.target.value }))}
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            >
                                <option value="TOFU">TOFU</option>
                                <option value="MOFU">MOFU</option>
                                <option value="BOFU">BOFU</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">Monthly Volume</label>
                            <input
                                type="number"
                                value={form.monthly_volume}
                                onChange={e => setForm(f => ({ ...f, monthly_volume: e.target.value }))}
                                placeholder="320"
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">Keyword Difficulty</label>
                            <input
                                type="number"
                                value={form.keyword_difficulty}
                                onChange={e => setForm(f => ({ ...f, keyword_difficulty: e.target.value }))}
                                placeholder="17"
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">Word Count Target</label>
                            <input
                                type="number"
                                value={form.word_count_target}
                                onChange={e => setForm(f => ({ ...f, word_count_target: e.target.value }))}
                                placeholder="1500"
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">Cluster</label>
                            <input
                                type="text"
                                value={form.cluster}
                                onChange={e => setForm(f => ({ ...f, cluster: e.target.value }))}
                                placeholder="commercial real estate marketing"
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">Pillar</label>
                            <input
                                type="text"
                                value={form.pillar}
                                onChange={e => setForm(f => ({ ...f, pillar: e.target.value }))}
                                placeholder="SEO for commercial real estate"
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                        <div className="lg:col-span-3">
                            <label className="block text-xs font-medium text-stone-600 mb-1">Image Prompt</label>
                            <input
                                type="text"
                                value={form.featured_image_prompt}
                                onChange={e => setForm(f => ({ ...f, featured_image_prompt: e.target.value }))}
                                placeholder="Professional commercial real estate office building, modern architecture..."
                                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-5 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
                    >
                        Add to Queue
                    </button>
                </form>

                {/* Queue table */}
                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-stone-50 border-b border-stone-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Keyword</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Vol</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">KD</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Stage</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Cluster</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Added</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {queueItems.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 text-stone-400">No keywords in queue</td>
                                </tr>
                            )}
                            {queueItems.map((item) => (
                                <tr key={item._id} className="hover:bg-stone-50">
                                    <td className="px-4 py-3 font-medium text-stone-900 max-w-[200px] truncate">{item.target_keyword}</td>
                                    <td className="px-4 py-3 text-stone-600">{item.monthly_volume ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-600">{item.keyword_difficulty ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-600">{item.funnel_stage ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-500 max-w-[150px] truncate">{item.cluster ?? "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[item.status] || "bg-stone-100 text-stone-700"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-stone-400 text-xs">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.status === "pending" && (
                                            <button
                                                onClick={() => removeFromQueue({ id: item._id })}
                                                className="text-red-500 hover:text-red-700 text-xs font-medium"
                                            >
                                                Remove
                                            </button>
                                        )}
                                        {item.status === "published" && item.postId && (
                                            <a href={`/admin/blog`} className="text-emerald-600 hover:text-emerald-700 text-xs font-medium">
                                                View post
                                            </a>
                                        )}
                                        {item.status === "failed" && (
                                            <span className="text-red-400 text-xs" title={item.error_message}>Failed</span>
                                        )}
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
