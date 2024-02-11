import { PrismaClient } from '@prisma/client';
import { Url } from '@/util/typical/types';

const prisma = new PrismaClient();

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