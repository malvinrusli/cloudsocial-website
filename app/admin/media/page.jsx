"use client";
import MediaUpload from "../../components/MediaUpload";
import Navbar from "../../components/Navbar";

export default function AdminMediaPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24">
                <MediaUpload />
            </div>
        </main>
    );
}
