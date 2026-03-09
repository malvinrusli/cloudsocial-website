"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AdminNav from "../../components/AdminNav";

export default function AdminBofuPage() {
    const pages = useQuery(api.bofuPages.listAll) ?? [];
    const createPage = useMutation(api.bofuPages.create);
    const updatePage = useMutation(api.bofuPages.update);
    const removePage = useMutation(api.bofuPages.remove);
    const togglePublish = useMutation(api.bofuPages.togglePublish);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        page_type: "location",
        target_keyword: "",
        hero_badge: "",
        hero_title: "",
        hero_subtitle: "",
        blocks: "[]",
        seo_title: "",
        meta_description: "",
    });

    const resetForm = () => {
        setForm({ title: "", slug: "", page_type: "location", target_keyword: "", hero_badge: "", hero_title: "", hero_subtitle: "", blocks: "[]", seo_title: "", meta_description: "" });
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (page) => {
        setForm({
            title: page.title || "",
            slug: page.slug || "",
            page_type: page.page_type || "location",
            target_keyword: page.target_keyword || "",
            hero_badge: page.hero_badge || "",
            hero_title: page.hero_title || "",
            hero_subtitle: page.hero_subtitle || "",
            blocks: page.blocks || "[]",
            seo_title: page.seo_title || "",
            meta_description: page.meta_description || "",
        });
        setEditId(page._id);
        setShowForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const data = {
            title: form.title,
            slug: form.slug,
            page_type: form.page_type || undefined,
            target_keyword: form.target_keyword || undefined,
            hero_badge: form.hero_badge || undefined,
            hero_title: form.hero_title || undefined,
            hero_subtitle: form.hero_subtitle || undefined,
            blocks: form.blocks || undefined,
            seo_title: form.seo_title || undefined,
            meta_description: form.meta_description || undefined,
        };
        if (editId) {
            await updatePage({ id: editId, ...data });
        } else {
            await createPage({ status: "draft", ...data });
        }
        resetForm();
    };

    const f = (key, label, opts = {}) => (
        <div className={opts.full ? "col-span-2" : ""}>
            <label className="block text-xs font-medium text-stone-600 mb-1">{label}</label>
            {opts.textarea ? (
                <textarea
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    rows={opts.rows || 3}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-mono"
                    placeholder={opts.placeholder}
                />
            ) : (
                <input
                    type="text"
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={opts.placeholder}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50">
            <AdminNav />
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-stone-900">BOFU Pages</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
                    >
                        New BOFU Page
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSave} className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
                        <h2 className="text-sm font-semibold text-stone-900 mb-4">{editId ? "Edit Page" : "New BOFU Page"}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {f("title", "Title *", { full: true, placeholder: "Commercial Real Estate SEO in Houston" })}
                            {f("slug", "Slug *", { placeholder: "commercial-real-estate-seo-houston" })}
                            <div>
                                <label className="block text-xs font-medium text-stone-600 mb-1">Page Type</label>
                                <select
                                    value={form.page_type}
                                    onChange={e => setForm(f => ({ ...f, page_type: e.target.value }))}
                                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                                >
                                    <option value="location">Location</option>
                                    <option value="comparison">Comparison</option>
                                    <option value="campaign">Campaign</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>
                            {f("target_keyword", "Target Keyword", { placeholder: "commercial real estate SEO Houston" })}
                            {f("hero_badge", "Hero Badge", { placeholder: "Houston, TX" })}
                            {f("hero_title", "Hero Title", { full: true, placeholder: "Commercial Real Estate SEO for Houston Brokers" })}
                            {f("hero_subtitle", "Hero Subtitle", { full: true, placeholder: "We help Houston CRE brokers rank for the keywords that bring in property owners and investors." })}
                            {f("blocks", "Blocks JSON (AlternatingSection)", { full: true, textarea: true, rows: 10, placeholder: '[{"type":"centered","title":"...","text":"..."}]' })}
                            {f("seo_title", "SEO Title", { full: true, placeholder: "Commercial Real Estate SEO Houston | CloudSocial" })}
                            {f("meta_description", "Meta Description", { full: true, textarea: true, rows: 2, placeholder: "CloudSocial helps Houston commercial real estate firms rank higher and generate more qualified leads." })}
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button type="submit" className="px-5 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors">
                                {editId ? "Save Changes" : "Create Page"}
                            </button>
                            <button type="button" onClick={resetForm} className="px-5 py-2 border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-stone-50 border-b border-stone-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Title</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Type</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Keyword</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Updated</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {pages.length === 0 && (
                                <tr><td colSpan={6} className="text-center py-10 text-stone-400">No BOFU pages yet</td></tr>
                            )}
                            {pages.map(page => (
                                <tr key={page._id} className="hover:bg-stone-50">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-stone-900 max-w-[240px] truncate">{page.title}</div>
                                        <div className="text-stone-400 text-xs mt-0.5">/lp/{page.slug}</div>
                                    </td>
                                    <td className="px-4 py-3 text-stone-500 capitalize">{page.page_type ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-600 max-w-[160px] truncate">{page.target_keyword ?? "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                            page.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-600"
                                        }`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-stone-400 text-xs">{new Date(page.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleEdit(page)} className="text-blue-600 hover:text-blue-700 text-xs font-medium">Edit</button>
                                            <button onClick={() => togglePublish({ id: page._id })} className="text-stone-500 hover:text-stone-700 text-xs font-medium">
                                                {page.status === "published" ? "Unpublish" : "Publish"}
                                            </button>
                                            <button
                                                onClick={() => { if (confirm("Delete this page?")) removePage({ id: page._id }); }}
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
