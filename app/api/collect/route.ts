// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createEvent } from '@/models/Event';
import { extractParamsForOriginator } from '@/models/Originators';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import NextCors from 'nextjs-cors';
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};



// import corsMiddleware from '@/utils/corsMiddleware';
// import { extractParamsForCollector } from '@/models/Collector';

// import { createEvent } from '@/models/Events';


// function corsMiddleware(req: NextRequest, res: NextResponse) {
//     // Set the necessary headers for CORS
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this to be more restrictive if necessary
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//         return;
//     }
// }

export async function GET(request: NextRequest) {


    // await corsMiddleware(req, res);

    console.log(request)

    let { type, url, originatorId, country, city, error } =
        await extractParamsForOriginator(request);
    const d = await createEvent(type, url, originatorId, country, city);

    return NextResponse.json({ message: 200 }, { headers: corsHeaders })

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