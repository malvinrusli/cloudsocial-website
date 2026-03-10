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
        secondary_keywords: "",
        monthly_volume: "0",
        keyword_difficulty: "0",
        word_count_target: "1500",
        seo_title: "",
        meta_description: "",
        og_title: "",
        og_description: "",
        featured_image_alt: "",
        featured_image_prompt: "",
        json_ld: "",
        key_takeaways: "",
        faqs: [],
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
                secondary_keywords: post.secondary_keywords?.join(", ") || "",
                monthly_volume: String(post.monthly_volume || 0),
                keyword_difficulty: String(post.keyword_difficulty || 0),
                word_count_target: String(post.word_count_target || 1500),
                seo_title: post.seo_title || "",
                meta_description: post.meta_description || "",
                og_title: post.og_title || "",
                og_description: post.og_description || "",
                featured_image_alt: post.featured_image_alt || "",
                featured_image_prompt: post.featured_image_prompt || "",
                json_ld: post.json_ld || "",
                key_takeaways: post.key_takeaways?.join("\n") || "",
                faqs: post.faqs || [],
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
                secondary_keywords: form.secondary_keywords.split(",").map(k => k.trim()).filter(Boolean),
                monthly_volume: parseInt(form.monthly_volume) || 0,
                keyword_difficulty: parseInt(form.keyword_difficulty) || 0,
                word_count_target: form.word_count_target ? parseInt(form.word_count_target) : undefined,
                seo_title: form.seo_title || undefined,
                meta_description: form.meta_description || undefined,
                og_title: form.og_title || undefined,
                og_description: form.og_description || undefined,
                featured_image_alt: form.featured_image_alt || undefined,
                featured_image_prompt: form.featured_image_prompt || undefined,
                json_ld: form.json_ld || undefined,
                key_takeaways: form.key_takeaways.split("\n").map(t => t.trim()).filter(Boolean),
                faqs: form.faqs,
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

    const addFaq = () => {
        setForm(f => ({
            ...f,
            faqs: [...f.faqs, { question: "", answer: "" }]
        }));
    };

    const removeFaq = (index) => {
        setForm(f => ({
            ...f,
            faqs: f.faqs.filter((_, i) => i !== index)
        }));
    };

    const updateFaq = (index, field, value) => {
        const newFaqs = [...form.faqs];
        newFaqs[index][field] = value;
        setForm(f => ({ ...f, faqs: newFaqs }));
    };

    const field = (key, label, opts = {}) => (
        <div className={opts.full ? "col-span-2" : ""}>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wider">{label}</label>
            {opts.textarea ? (
                <textarea
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    rows={opts.rows || 4}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-mono bg-stone-50/50"
                    placeholder={opts.placeholder}
                />
            ) : (
                <input
                    type={opts.type || "text"}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={opts.placeholder}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                />
            )}
            {opts.hint && <p className="text-[10px] text-stone-400 mt-1">{opts.hint}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50/50 pb-20">
            <AdminNav />
            <div className="max-w-5xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blog" className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-stone-200 text-stone-500 hover:text-stone-900 transition-colors">←</Link>
                        <h1 className="text-2xl font-bold text-stone-900">{isNew ? "Create Authority Post" : "Edit Authority Post"}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {saved && <span className="text-emerald-600 text-sm font-medium animate-pulse">✓ Changes Saved</span>}
                        {!isNew && (
                            <a
                                href={`/blogs/${form.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                            >
                                Preview Live →
                            </a>
                        )}
                        <button
                            form="blog-form"
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 disabled:opacity-50 transition-all shadow-sm"
                        >
                            {saving ? "Saving..." : isNew ? "Publish Post" : "Update Post"}
                        </button>
                    </div>
                </div>

                <form id="blog-form" onSubmit={handleSave} className="grid grid-cols-3 gap-8">
                    {/* Left Column: Main Content */}
                    <div className="col-span-2 space-y-8">
                        {/* Editor Section */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-stone-900 rounded-full"></span>
                                Editorial Content
                            </h2>
                            <div className="space-y-6">
                                {field("title", "Article Title", { full: true, placeholder: "e.g. How to Dominate CRE in Jakarta" })}
                                {field("slug", "URL Slug", { full: true, placeholder: "how-to-dominate-cre-jakarta" })}
                                {field("excerpt", "The Hook (Excerpt)", { full: true, textarea: true, rows: 3, placeholder: "A powerful 2-3 sentence summary to hook the reader..." })}
                                {field("content", "Body Content (HTML)", { full: true, textarea: true, rows: 25, placeholder: "<h1>...</h1><p>...</p>" })}
                            </div>
                        </div>

                        {/* Interactive Elements Section */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-stone-900 rounded-full"></span>
                                Engagement Assets
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-xs font-semibold text-stone-600 mb-3 uppercase tracking-wider">Key Takeaways (One per line)</label>
                                    <textarea
                                        value={form.key_takeaways}
                                        onChange={e => setForm(f => ({ ...f, key_takeaways: e.target.value }))}
                                        rows={5}
                                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                                        placeholder="Authority is leverage...&#10;Inbound is compounding..."
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Frequently Asked Questions</label>
                                        <button
                                            type="button"
                                            onClick={addFaq}
                                            className="text-[10px] font-bold text-stone-500 hover:text-stone-900 uppercase tracking-widest bg-stone-100 px-2 py-1 rounded transition-colors"
                                        >
                                            + Add FAQ
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {form.faqs.map((faq, idx) => (
                                            <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-100 relative group">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFaq(idx)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-red-100 shadow-sm text-xs font-bold"
                                                >
                                                    ×
                                                </button>
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        value={faq.question}
                                                        onChange={e => updateFaq(idx, "question", e.target.value)}
                                                        placeholder="Question"
                                                        className="w-full bg-transparent border-b border-stone-200 focus:border-stone-900 focus:outline-none text-sm font-bold"
                                                    />
                                                    <textarea
                                                        value={faq.answer}
                                                        onChange={e => updateFaq(idx, "answer", e.target.value)}
                                                        placeholder="Answer"
                                                        rows={2}
                                                        className="w-full bg-transparent focus:outline-none text-sm text-stone-600"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {form.faqs.length === 0 && (
                                            <div className="text-center py-6 border-2 border-dashed border-stone-100 rounded-xl">
                                                <span className="text-xs text-stone-400 italic">No FAQs added yet</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar Metadata */}
                    <div className="space-y-8">
                        {/* Publishing Info */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">Publishing</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none appearance-none bg-stone-50/50 font-medium"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                {field("author", "Author")}
                                {field("funnel_stage", "Funnel Stage", { hint: "TOFU / MOFU / BOFU" })}
                            </div>
                        </div>

                        {/* Keyword Strategy */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">Strategy</h3>
                            <div className="space-y-4">
                                {field("target_keyword", "Primary Keyword")}
                                {field("secondary_keywords", "Secondary Keywords", { hint: "Comma separated" })}
                                <div className="grid grid-cols-2 gap-3">
                                    {field("monthly_volume", "Volume", { type: "number" })}
                                    {field("keyword_difficulty", "Difficulty", { type: "number" })}
                                </div>
                                {field("cluster", "Topic Cluster")}
                                {field("pillar", "Pillar Page")}
                            </div>
                        </div>

                        {/* SEO Overrides */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">Meta & Social</h3>
                            <div className="space-y-4">
                                {field("seo_title", "SEO Title")}
                                {field("meta_description", "Meta Desc", { textarea: true, rows: 2 })}
                                {field("og_title", "Social Title")}
                                {field("og_description", "Social Desc", { textarea: true, rows: 2 })}
                                {field("json_ld", "Schema (JSON-LD)", { textarea: true, rows: 5 })}
                            </div>
                        </div>

                        {/* Media */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">Featured Image</h3>
                            <div className="space-y-4">
                                {field("featured_image_alt", "Alt Text")}
                                {field("featured_image_prompt", "AI Prompt", { textarea: true, rows: 3 })}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
