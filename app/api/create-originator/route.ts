import { corsHeaders } from '@/util/types';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';




const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {

    const origin = request.headers.get ?? '';

	const originatorId = nanoid(9)

	const originator = await prisma.originator.create({
		data: {
			id: originatorId,
			origin: origin,
			timestamp: new Date(),
		},
	});
    return NextResponse.json({ message: 200 }, { headers: corsHeaders })



};


// curl "http://localhost:3000/api/create-originator"