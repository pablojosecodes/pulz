
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createEvent } from '@/models/Event';
import { extractParamsForOriginator } from '@/models/Originators';
import type { NextApiRequest, NextApiResponse } from 'next';

// import corsMiddleware from '@/utils/corsMiddleware';
// import { extractParamsForCollector } from '@/models/Collector';

// import { createEvent } from '@/models/Events';
import { nanoid } from 'nanoid';

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(request: NextApiRequest) {

    const origin = request.headers.origin ?? '';
	console.log(request.headers['origin'])
	console.log(request.headers['host'])
	console.log(request.headers.host)
	console.log(request.headers.or)

	console.log(request)
	// request.get('origin')

	// console.log(request.headers)
	// console.log(origin)

	const collector = await prisma.originator.create({
		data: {
			id: nanoid(9),
			origin: origin,
			timestamp: new Date(),
		},
	});
	console.log(collector)

};


// curl "http://localhost:3000/api/create-collector"