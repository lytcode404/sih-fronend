export async function POST(req) {
    const { query } = await req.json();

    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input_text: query }),
        });
        const data = await res.json();

        return Response.json({ data, status: 201 });
    } catch (err) {
        return Response.json(
            { error: "An error occurred while processing your request" },
            { status: 500 }
        );
    }
}
