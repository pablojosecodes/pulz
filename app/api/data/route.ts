import { createOriginator } from '@/models/Originators';
import generateStatsCollector from '@/util/generateStatsCollector';
import { corsMiddleware } from '@/util/typical/middle';
import { NextRequest, NextResponse } from 'next/server';


function sendResponse(obfuscatedJs: string) {
	const response = new NextResponse(obfuscatedJs, {
		status: 200,
		headers: {
			'Content-Type': 'application/javascript',
			'Cache-Control': 'private, max-age=0, must-revalidate'
		}
	});
	return response;
}



export async function GET(
	req: NextRequest,
	res: NextResponse
) {

	const allowedDomain = await corsMiddleware(req)
	if (!allowedDomain) {
		return NextResponse.json({ message: 403 });
	}

	const origin = req.headers.get("origin") ?? '';

	const originatorId = await createOriginator(origin);

	const obfuscatedJs = generateStatsCollector(originatorId);
	const response = sendResponse(obfuscatedJs)
	return response
}


