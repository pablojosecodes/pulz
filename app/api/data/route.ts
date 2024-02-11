import type { NextApiRequest, NextApiResponse } from 'next';
// import { createCollector } from '@/models/Collector';
// import corsMiddleware from '@/utils/corsMiddleware';
import { createOriginator } from '@/models/Originators';
import generateStatsCollector from '@/lib/generateStatsCollector';
import corsMiddleware from '@/lib/middle';

export async function get(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await corsMiddleware(req, res);

	const origin = req.headers.origin ?? '';

	const originatorId = await createOriginator(origin);

	const obfuscatedJs = generateStatsCollector(originatorId);

	res
		.setHeader('Content-Type', 'application/javascript')
		.setHeader('Cache-Control', 'private, max-age=0, must-revalidate')
		.status(200)
		.send(obfuscatedJs);
}