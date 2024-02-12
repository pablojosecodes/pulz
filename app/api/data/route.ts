import { createOriginator } from '@/models/Originators';
import generateStatsCollector from '@/util/generateStatsCollector';
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

	// const response = NextResponse.json(obfuscatedJs, { status: 200 })
	// response.headers.set('Content-Type', 'application/javascript');
	// response.headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
	// return response;
}



export async function GET(
	req: NextRequest,
	res: NextResponse
) {
	// await corsMiddleware(req, res);

	const origin = req.headers.get("origin") ?? '';

	const originatorId = await createOriginator(origin);
	console.log(originatorId)

	const obfuscatedJs = generateStatsCollector(originatorId);
	const response = sendResponse(obfuscatedJs)
	console.log("obfuscatedJs")
	console.log(obfuscatedJs)
	return response
}


