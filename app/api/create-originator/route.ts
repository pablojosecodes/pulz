
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createEvent } from '@/models/Event';
import { extractParamsForOriginator } from '@/models/Originators';
import type { NextApiRequest, NextApiResponse } from 'next';

// import corsMiddleware from '@/utils/corsMiddleware';
// import { extractParamsForCollector } from '@/models/Collector';

// import { createEvent } from '@/models/Events';
import { nanoid } from 'nanoid';
import { NextRequest } from 'next/server';

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {

    const origin = request.headers.get("origin") ?? '';
	console.log(request.headers.get('origin'))
	console.log(request.headers.get('host'))


	console.log(request)

	const originatorId = nanoid(9)

	const originator = await prisma.originator.create({
		data: {
			id: originatorId,
			origin: origin,
			timestamp: new Date(),
		},
	});


	return Response.json({ originatorId })
};


// curl "http://localhost:3000/api/create-originator"