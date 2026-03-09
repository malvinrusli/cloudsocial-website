"use client";
import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Upload, Trash2, Copy, Check } from "lucide-react";

export default function MediaUpload() {
    const generateUploadUrl = useMutation(api.media.generateUploadUrl);
    const saveMedia = useMutation(api.media.saveMedia);
    const deleteMedia = useMutation(api.media.deleteMedia);
    const files = useQuery(api.media.listMedia) ?? [];

    const [uploading, setUploading] = useState(false);
    const [label, setLabel] = useState("");
    const [category, setCategory] = useState("image");
    const [copied, setCopied] = useState(null);
    const inputRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const uploadUrl = await generateUploadUrl();
            const res = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await res.json();
            await saveMedia({
                storageId,
                filename: file.name,
                contentType: file.type,
                category,
                label: label || file.name,
            });
            setLabel("");
            inputRef.current.value = "";
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    const copyUrl = async (url, id) => {
        await navigator.clipboard.writeText(url);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-white text-secondary p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-secondary">Media Library</h1>
                <p className="text-sm text-textDark/60 mt-1">Upload images and videos to Convex Storage.</p>
            </div>

            {/* Upload Panel */}
            <div className="border border-gray-200 p-6 mb-8 bg-white">
                <h2 className="text-sm font-semibold text-secondary mb-4">Upload New File</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-secondary mb-1.5">Label</label>
                        <input
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="e.g. Hero image"
                            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-secondary mb-1.5">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-secondary bg-white"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-secondary mb-1.5">File</label>
                        <label className="flex items-center gap-2 border border-gray-200 px-3 py-2 cursor-pointer hover:border-secondary transition-colors">
                            <Upload size={14} className="text-textDark/50" />
                            <span className="text-sm text-textDark/60">{uploading ? "Uploading..." : "Choose file"}</span>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*,video/*,.pdf"
                                onChange={handleUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* File List */}
            <div className="border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-xs font-semibold text-secondary">{files.length} file{files.length !== 1 ? "s" : ""}</p>
                </div>
                {files.length === 0 ? (
                    <div className="px-4 py-12 text-center text-sm text-textDark/40">No files uploaded yet.</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {files.map((f) => (
                            <div key={f._id} className="flex items-center gap-4 px-4 py-3">
                                {/* Thumbnail */}
                                <div className="w-12 h-12 border border-gray-100 flex-shrink-0 overflow-hidden bg-gray-50">
                                    {f.category === "image" && f.url ? (
                                        <img src={f.url} alt={f.label} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-textDark/30 font-medium uppercase">
                                            {f.category?.slice(0, 3) ?? "---"}
                                        </div>
                                    )}
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-secondary truncate">{f.label || f.filename}</p>
                                    <p className="text-xs text-textDark/40">{f.filename} · {f.category}</p>
                                </div>
                                {/* URL */}
                                {f.url && (
                                    <button
                                        onClick={() => copyUrl(f.url, f._id)}
                                        className="flex items-center gap-1.5 text-xs font-medium text-textDark/60 hover:text-secondary border border-gray-200 px-2.5 py-1.5 transition-colors"
                                        title="Copy URL"
                                    >
                                        {copied === f._id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                        {copied === f._id ? "Copied" : "Copy URL"}
                                    </button>
                                )}
                                {/* Delete */}
                                <button
                                    onClick={() => deleteMedia({ id: f._id, storageId: f.storageId })}
                                    className="text-gray-300 hover:text-red-400 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
