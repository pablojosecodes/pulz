import type { NextApiRequest } from 'next';

import { nanoid } from 'nanoid';
import { NextRequest } from 'next/server';
import { parseLocationFromRequest } from '@/util/requestHandling';



export const createOriginator = async (origin: string) => {
    const currentDate = new Date();

    const originator = await prisma.originator.create({
        data: {
            id: nanoid(9),
            origin: origin,
            timestamp: currentDate
        },
    });

    return originator.id;
};

export const doesOriginatorExist = async (originatorId: string | null): Promise<Boolean> => {
    if (!originatorId) return false;

    return await prisma.originator
        .findFirst({
            where: {
                id: originatorId,
            },
            select: { id: true },
        })
        .then((r: any) => Boolean(r));
};

export const paramsForOriginator = async (
    req: NextRequest
): Promise<{
    type: string;
    url: string;
    country: string;
    city: string;
    originatorId: string;
    error: boolean;
}> => {

    let error = false;

    const urlString = req.url as string;
    const _url: URL = new URL(urlString);

    let type = _url.searchParams.get('type');
    let url = _url.searchParams.get('url');
    let originatorId = _url.searchParams.get('originatorId');
    

    const { country, city } = parseLocationFromRequest(req);

    return {
        type: <string>type,
        url: <string>url,
        originatorId: <string>originatorId,
        country,
        city,
        error,
    };
};
