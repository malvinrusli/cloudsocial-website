"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminNav from "../../../components/AdminNav";

export default function BlogPostEditorPage() {
    const params = useParams();
    const router = useRouter();
    const isNew = params.id === "new";

    const post = useQuery(
        api.posts.getById,
        isNew ? "skip" : { id: params.id }
    );

    const createPost = useMutation(api.posts.create);
    const updatePost = useMutation(api.posts.update);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        status: "draft",
        author: "CloudSocial Team",
        funnel_stage: "TOFU",
        cluster: "",
        pillar: "",
        target_keyword: "",
        word_count_target: "1500",
        seo_title: "",
        meta_description: "",
        og_title: "",
        og_description: "",
        featured_image_alt: "",
        featured_image_prompt: "",
        json_ld: "",
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (post) {
            setForm({
                title: post.title || "",
                slug: post.slug || "",
                content: post.content || "",
                excerpt: post.excerpt || "",
                status: post.status || "draft",
                author: post.author || "CloudSocial Team",
                funnel_stage: post.funnel_stage || "TOFU",
                cluster: post.cluster || "",
                pillar: post.pillar || "",
                target_keyword: post.target_keyword || "",
                word_count_target: String(post.word_count_target || 1500),
                seo_title: post.seo_title || "",
                meta_description: post.meta_description || "",
                og_title: post.og_title || "",
                og_description: post.og_description || "",
                featured_image_alt: post.featured_image_alt || "",
                featured_image_prompt: post.featured_image_prompt || "",
                json_ld: post.json_ld || "",
            });
        }
    }, [post]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = {
                title: form.title,
                slug: form.slug,
                content: form.content,
                excerpt: form.excerpt || undefined,
                status: form.status,
                author: form.author,
                funnel_stage: form.funnel_stage || undefined,
                cluster: form.cluster || undefined,
                pillar: form.pillar || undefined,
                target_keyword: form.target_keyword || undefined,
                word_count_target: form.word_count_target ? parseInt(form.word_count_target) : undefined,
                seo_title: form.seo_title || undefined,
                meta_description: form.meta_description || undefined,
                og_title: form.og_title || undefined,
                og_description: form.og_description || undefined,
                featured_image_alt: form.featured_image_alt || undefined,
                featured_image_prompt: form.featured_image_prompt || undefined,
                json_ld: form.json_ld || undefined,
                publishedAt: form.status === "published" ? Date.now() : undefined,
            };

            if (isNew) {
                const id = await createPost(data);
                router.push(`/admin/blog/${id}`);
            } else {
                await updatePost({ id: params.id, ...data });
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            }
        } finally {
            setSaving(false);
        }
    };

    const field = (key, label, opts = {}) => (
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
                    type={opts.type || "text"}
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
            <div className="max-w-4xl mx-auto px-6 py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/blog" className="text-stone-500 hover:text-stone-700 text-sm">← Blog Posts</Link>
                    <h1 className="text-xl font-bold text-stone-900">{isNew ? "New Post" : "Edit Post"}</h1>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Core */}
                    <div className="bg-white border border-stone-200 rounded-xl p-6">
                        <h2 className="text-sm font-semibold text-stone-900 mb-4">Content</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {field("title", "Title *", { full: true, placeholder: "Commercial Real Estate SEO: Complete Guide" })}
                            {field("slug", "Slug *", { placeholder: "commercial-real-estate-seo-guide" })}
                            <div>
                                <label className="block text-xs font-medium text-stone-600 mb-1">Status</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            {field("author", "Author", { placeholder: "CloudSocial Team" })}
                            {field("excerpt", "Excerpt", { full: true, textarea: true, rows: 2, placeholder: "2-3 sentence summary..." })}
                            {field("content", "Content (HTML)", { full: true, textarea: true, rows: 20, placeholder: "<h1>...</h1><p>...</p>" })}
                        </div>
                    </div>

                    {/* SEO + Keyword */}
                    <div className="bg-white border border-stone-200 rounded-xl p-6">
                        <h2 className="text-sm font-semibold text-stone-900 mb-4">SEO & Keyword Data</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {field("target_keyword", "Target Keyword", { full: true, placeholder: "commercial real estate SEO" })}
                            {field("funnel_stage", "Funnel Stage", { placeholder: "TOFU / MOFU / BOFU" })}
                            {field("cluster", "Cluster", { placeholder: "commercial real estate marketing" })}
                            {field("pillar", "Pillar", { placeholder: "SEO for commercial real estate" })}
                            {field("seo_title", "SEO Title (max 60 chars)", { full: true, placeholder: "Commercial Real Estate SEO: Complete Guide | CloudSocial" })}
                            {field("meta_description", "Meta Description (max 155 chars)", { full: true, textarea: true, rows: 2, placeholder: "Learn how to dominate commercial real estate search rankings..." })}
                            {field("og_title", "OG Title", { full: true, placeholder: "Social share title" })}
                            {field("og_description", "OG Description", { full: true, textarea: true, rows: 2, placeholder: "Social share description" })}
                            {field("json_ld", "JSON-LD (Schema)", { full: true, textarea: true, rows: 5, placeholder: '{"@context": "https://schema.org", "@type": "BlogPosting", ...}' })}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="bg-white border border-stone-200 rounded-xl p-6">
                        <h2 className="text-sm font-semibold text-stone-900 mb-4">Featured Image</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {field("featured_image_alt", "Alt Text", { full: true, placeholder: "Commercial real estate office building in city center" })}
                            {field("featured_image_prompt", "Imagen Prompt", { full: true, placeholder: "Professional commercial real estate office building, modern architecture..." })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
                        >
                            {saving ? "Saving..." : isNew ? "Create Post" : "Save Changes"}
                        </button>
                        {saved && <span className="text-emerald-600 text-sm font-medium">Saved</span>}
                        {!isNew && (
                            <a
                                href={`/blogs/${form.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                                View live →
                            </a>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
