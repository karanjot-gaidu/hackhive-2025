import fs from 'fs/promises';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: { planet: string } }
) {
    const { planet } = await params;

    if (!planet) {
        return new Response('Planet parameter is required', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'lib', `${planet.toLowerCase()}.txt`);

    try {
        const text = await fs.readFile(filePath, 'utf-8');
        return new Response(text, { status: 200 });
    } catch (error) {
        console.error(`Error loading planet ${planet}:`, error);
        return new Response('Planet information not found', { status: 404 });
    }
}

