import type { NextApiRequest } from 'next';

import { nanoid } from 'nanoid';

export const temporaryConfig: { [key: string]: string | string[] | undefined } = {
	APP_URL: 'http://localhost:3000',
	CORS_ALLOWED_ORIGIN: ['http://localhost:3000', 'https://udara.io'],
};

/**
 * Checks if a string is a valid URL.
 * @param urlString The string to check.
 * @returns true if the string is a valid URL, false otherwise.
 */
export const isValidUrl = (urlString: string): boolean => { 
    try {
        new URL(urlString);
        return true;
    } catch (e) {
        return false;
    }
};

const parseLocationFromRequest = (
	req: NextApiRequest
): { city: string; country: string } => {
	const headers = req.headers;
    console.log(headers)
    console.log(headers['x-vercel-ip-country'])

	const decodedCountry = decodeURI(<string>headers['x-vercel-ip-country']);
	const decodedCity = decodeURI(<string>headers['x-vercel-ip-city']);

	const country = decodedCountry ?? 'undefined';
	const city = decodedCity ?? 'undefined';
    console.log(country)

	return { country, city };
};



// const parseLocationFromRequest = (req: NextApiRequest): { city: string; country: string } => {
//     // const getHeaderValue = (headerValue: string | string[] | undefined): string => {
//     //     if (Array.isArray(headerValue)) {
//     //         // If it's an array, take the first value
//     //         return headerValue[0];
//     //     } else {
//     //         // If it's a string or undefined, return it as is (or 'undefined')
//     //         return headerValue ?? 'undefined';
//     //     }
//     // };
//     const getHeaderValue = (headerValue: string | string[] | undefined): string => {
//         console.log(headerValue)
//         if (Array.isArray(headerValue)) {
//             // If it's an array, take the first value
//             return headerValue[0];
//         } else {
//             // If it's a string or undefined, return it as is (or 'undefined')
//             return headerValue ?? 'undefined';
//         }
//     };

//     // const testHeaders = {
//     //     'x-vercel-ip-country': 'TestCountry',
//     //     'x-vercel-ip-city': 'TestCity',
//     // };
//     // console.log(typeof(req.headers.))
//     // console.log(req.headers)
//     const country = getHeaderValue(req.headers['x-vercel-ip-country']);
//     const city = getHeaderValue(req.headers['x-vercel-ip-city']);

//     return { country, city };
// };




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


export const checkIfOriginatorExists = async (originatorId: string | null): Promise<Boolean> => {
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

export const extractParamsForOriginator = async (
    req: NextApiRequest
): Promise<{
    type: string;
    url: string;
    country: string;
    city: string;
    originatorId: string;
    error: boolean;
}> => {

    let error = false;

    // const urlString = `${temporaryConfig.APP_URL}${req.url}`;
    const urlString = req.url as string;
    const _url: URL = new URL(urlString);

    let type = _url.searchParams.get('type');
    let url = _url.searchParams.get('url');
    let originatorId = _url.searchParams.get('originatorId');
    console.log(_url)
    console.log("ORIGINATOR ID IS " + originatorId)

    

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

// https://yourdomain.com/api/yourEndpoint?
// curl "http://localhost:3000/api/collect?type=someType&url=someUrl&originatorId=someId" \
// -H "x-vercel-ip-country: CountryName" \
// -H "x-vercel-ip-city: CityName"
