import { createOriginator } from '@/models/Originators';
import generateStatsCollector from '@/util/generateStatsCollector';
import { NextRequest, NextResponse } from 'next/server';


function sendResponse(obfuscatedJs: string) {
	const response = NextResponse.json({ body: obfuscatedJs }, { status: 200 })
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


