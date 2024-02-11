// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createEvent } from '@/models/Event';
import { extractParamsForOriginator } from '@/models/Originators';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

// import corsMiddleware from '@/utils/corsMiddleware';
// import { extractParamsForCollector } from '@/models/Collector';

// import { createEvent } from '@/models/Events';

export async function GET(request: NextRequest) {
    // await corsMiddleware(req, res);
    
    console.log(request)

    let { type, url, originatorId, country, city, error } =
        await extractParamsForOriginator(request);
    const d = await createEvent(type, url, originatorId, country, city);

    return Response.json({ message: 200 })

}



// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	await corsMiddleware(req, res);

// 	let { type, url, collector, country, city, error } =
// 		await extractParamsForCollector(req);

// 	if (error) return res.status(400).json({ status: 'failed' });

// 	// record the event
// 	await createEvent(type, url, collector, country, city);


// 	res.status(200).json({ status: 'success' });
// }

// curl -x GET