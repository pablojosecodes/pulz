import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Url = {
	url: string;
	total: number | null;
	first?: Date | null;
};

export const getUrls = async (
	start: Date,
	end: Date,
	filter: string | string[] | undefined
): Promise<Url[]> => {
	let urls = await prisma.url.findMany({
		take: 50,
		orderBy: { first: 'desc' },
	});

	return urls;
};