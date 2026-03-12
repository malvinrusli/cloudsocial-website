"use client";
import MediaUpload from "@/app/components/MediaUpload";
import Navbar from "@/app/components/Navbar";

import { useParams } from "next/navigation";

export default function AdminMediaPage() {
    const params = useParams();
    const lang = params?.lang || 'en';
    return (
        <main className="min-h-screen bg-white">
            <Navbar lang={lang} />
            <div className="pt-24">
                <MediaUpload />
            </div>
        </main>
    );
}
