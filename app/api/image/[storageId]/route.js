import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { storageId } = await params;

    try {
        const url = await fetchQuery(api.media.getUrl, { storageId });
        if (!url) {
            return new NextResponse("Image not found", { status: 404 });
        }
        // Redirect to Convex's CDN URL (temporary signed URL)
        return NextResponse.redirect(url);
    } catch {
        return new NextResponse("Error fetching image", { status: 500 });
    }
}
