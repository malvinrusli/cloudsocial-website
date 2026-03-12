"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import AdminNav from "@/app/components/AdminNav";

export default function AdminCaseStudiesPage() {
    const items = useQuery(api.caseStudies.listAll) ?? [];
    const createItem = useMutation(api.caseStudies.create);
    const updateItem = useMutation(api.caseStudies.update);
    const removeItem = useMutation(api.caseStudies.remove);
    const togglePublish = useMutation(api.caseStudies.togglePublish);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        client_name: "",
        industry: "",
        services: "",
        content: "",
        featured_image_alt: "",
        seo_title: "",
        meta_description: "",
        json_ld: "",
    });

    const resetForm = () => {
        setForm({ title: "", slug: "", client_name: "", industry: "", services: "", content: "", featured_image_alt: "", seo_title: "", meta_description: "", json_ld: "" });
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (item) => {
        setForm({
            title: item.title || "",
            slug: item.slug || "",
            client_name: item.client_name || "",
            industry: item.industry || "",
            services: (item.services || []).join(", "),
            content: item.content || "",
            featured_image_alt: item.featured_image_alt || "",
            seo_title: item.seo_title || "",
            meta_description: item.meta_description || "",
            json_ld: item.json_ld || "",
        });
        setEditId(item._id);
        setShowForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const data = {
            title: form.title,
            slug: form.slug,
            client_name: form.client_name || undefined,
            industry: form.industry || undefined,
            services: form.services ? form.services.split(",").map(s => s.trim()).filter(Boolean) : undefined,
            content: form.content,
            featured_image_alt: form.featured_image_alt || undefined,
            seo_title: form.seo_title || undefined,
            meta_description: form.meta_description || undefined,
            json_ld: form.json_ld || undefined,
        };
        if (editId) {
            await updateItem({ id: editId, ...data });
        } else {
            await createItem({ status: "draft", ...data });
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
                    rows={opts.rows || 4}
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
                    <h1 className="text-2xl font-bold text-stone-900">Case Studies</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
                    >
                        New Case Study
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSave} className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
                        <h2 className="text-sm font-semibold text-stone-900 mb-4">{editId ? "Edit Case Study" : "New Case Study"}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {f("title", "Title *", { full: true, placeholder: "How Meridian CRE Grew Organic Leads by 340%" })}
                            {f("slug", "Slug *", { placeholder: "meridian-cre-organic-leads" })}
                            {f("client_name", "Client Name", { placeholder: "Meridian CRE Group" })}
                            {f("industry", "Industry", { placeholder: "Commercial Real Estate Brokerage" })}
                            {f("services", "Services (comma-separated)", { full: true, placeholder: "SEO, Content Architecture, Lead Automations" })}
                            {f("content", "Content (HTML)", { full: true, textarea: true, rows: 15, placeholder: "<h2>The Challenge</h2><p>...</p>" })}
                            {f("featured_image_alt", "Featured Image Alt", { full: true, placeholder: "Meridian CRE team in their Houston office" })}
                            {f("seo_title", "SEO Title", { full: true, placeholder: "Meridian CRE: 340% Lead Growth Case Study | Promperty" })}
                            {f("meta_description", "Meta Description", { full: true, textarea: true, rows: 2, placeholder: "See how Promperty helped Meridian CRE grow organic leads by 340% in 6 months." })}
                            {f("json_ld", "JSON-LD", { full: true, textarea: true, rows: 4, placeholder: '{"@type":"Article",...}' })}
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button type="submit" className="px-5 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors">
                                {editId ? "Save Changes" : "Create Case Study"}
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
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Client</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Industry</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Services</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-stone-600">Date</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {items.length === 0 && (
                                <tr><td colSpan={7} className="text-center py-10 text-stone-400">No case studies yet</td></tr>
                            )}
                            {items.map(item => (
                                <tr key={item._id} className="hover:bg-stone-50">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-stone-900 max-w-[220px] truncate">{item.title}</div>
                                        <div className="text-stone-400 text-xs mt-0.5">/case-studies/{item.slug}</div>
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">{item.client_name ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-500 max-w-[120px] truncate">{item.industry ?? "—"}</td>
                                    <td className="px-4 py-3 text-stone-500 max-w-[160px] truncate">{(item.services || []).join(", ") || "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-600"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-stone-400 text-xs">
                                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-700 text-xs font-medium">Edit</button>
                                            <button onClick={() => togglePublish({ id: item._id })} className="text-stone-500 hover:text-stone-700 text-xs font-medium">
                                                {item.status === "published" ? "Unpublish" : "Publish"}
                                            </button>
                                            <button
                                                onClick={() => { if (confirm("Delete this case study?")) removeItem({ id: item._id }); }}
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
