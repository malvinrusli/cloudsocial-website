"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X } from "lucide-react";

export default function ContactModal({ isOpen, onClose, source = "website" }) {
    const submitLead = useMutation(api.leads.submit);
    const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return;
        setStatus("submitting");
        try {
            await submitLead({ ...form, source });
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    const field = (key, label, type = "text", required = false) => (
        <div>
            <label className="block text-xs font-semibold text-secondary mb-1.5">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                required={required}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm text-secondary focus:outline-none focus:border-secondary transition-colors bg-white"
                placeholder={type === "email" ? "james@meridianCRE.com" : ""}
            />
        </div>
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full max-w-lg mx-4 border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-semibold text-secondary">Request a Free Strategy Audit</h2>
                        <p className="text-xs text-textDark/60 mt-0.5">We will respond within one business day.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-secondary transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {status === "success" ? (
                    <div className="px-6 py-12 text-center">
                        <div className="w-10 h-10 border border-emerald-200 bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-secondary">Submission received.</p>
                        <p className="text-xs text-textDark/60 mt-1">Our strategy team will be in touch within one business day.</p>
                        <button onClick={onClose} className="mt-6 text-xs font-semibold text-secondary underline underline-offset-4 decoration-gray-300">
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {field("name", "Full Name", "text", true)}
                            {field("email", "Work Email", "email", true)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {field("company", "Company")}
                            {field("phone", "Phone", "tel")}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-secondary mb-1.5">
                                What are you looking to achieve?
                            </label>
                            <textarea
                                rows={3}
                                value={form.message}
                                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                className="w-full border border-gray-200 px-3 py-2.5 text-sm text-secondary focus:outline-none focus:border-secondary transition-colors resize-none bg-white"
                                placeholder="e.g. Generate more investor inbound from LinkedIn, dominate Google for commercial SEO in Dallas..."
                            />
                        </div>

                        {status === "error" && (
                            <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full py-3 bg-secondary text-white text-sm font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-60"
                        >
                            {status === "submitting" ? "Sending..." : "Submit — Get Your Free Audit"}
                        </button>

                        <p className="text-[10px] text-textDark/40 text-center">
                            No spam. No pressure. Strategy first.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
