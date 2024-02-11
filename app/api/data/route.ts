import type { NextApiRequest, NextApiResponse } from 'next';
// import { createCollector } from '@/models/Collector';
// import corsMiddleware from '@/utils/corsMiddleware';
import { createOriginator } from '@/models/Originators';
import generateStatsCollector from '@/lib/generateStatsCollector';
// import corsMiddleware from '@/lib/middle';
import { NextRequest, NextResponse } from 'next/server';


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


function sendResponse(obfuscatedJs: string) {
	const response = NextResponse.json({ body: obfuscatedJs }, { status: 200 })

	// return 

	// Set headers
	response.headers.set('Content-Type', 'application/javascript');
	response.headers.set('Cache-Control', 'private, max-age=0, must-revalidate');



	return response;
}



export async function GET(
	req: NextRequest,
	res: NextResponse
) {
	// await corsMiddleware(req, res);

	const origin = req.headers.get("origin") ?? '';

	const originatorId = await createOriginator(origin);

	const obfuscatedJs = generateStatsCollector(originatorId);


	return sendResponse(obfuscatedJs)
}


