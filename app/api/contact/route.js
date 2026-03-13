export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, company, phone, message, source } = body;

        if (!name || !email) {
            return Response.json({ error: 'Name and email are required' }, { status: 400 });
        }

        // Log submission (replace with your email service, e.g. Resend, Mailgun, etc.)
        console.log('Contact form submission:', { name, email, company, phone, message, source });

        return Response.json({ success: true });
    } catch {
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
