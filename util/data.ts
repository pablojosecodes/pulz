import { DataItem } from "./typical/types";
import { getEvents } from '@/models/Event';
import { getUrls } from '@/models/Urls';
import { Fetcher } from 'swr';
import { NextRequest } from "next/server";

export const fetcher: Fetcher<any, string> = (...args) =>
	fetch(...args).then((res) => res.json());


	
export async function queryData(
	start: Date,
	end: Date,
	filter: string | string[] | undefined
) {
	const events = await getEvents(start, end, filter);
	const urls = await getUrls(start, end, filter);

	return { events, urls };
}



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



export const parseLocationFromRequest = (
	req: NextRequest
): { city: string; country: string } => {
	const headers = req.headers;
    console.log(headers)
    console.log(headers.get('x-vercel-ip-country'))

	const decodedCountry = decodeURI(<string>headers.get('x-vercel-ip-country'))
	const decodedCity = decodeURI(<string>headers.get('x-vercel-ip-city'))

	const country = decodedCountry ?? 'undefined';
	const city = decodedCity ?? 'undefined';
    console.log(country)

	return { country, city };
};

export function aggregateDataByPathname(filteredEvents: DataItem[]) {
    const aggregatedData = new Map();

    filteredEvents.forEach((item: DataItem) => {
        console.log(item.url)
        try {
            const url = new URL(item.url);
            const pathname = url.pathname;
            console.log(url)
            const key = `${url} ${pathname}`;

            if (!aggregatedData.has(key)) {
                aggregatedData.set(key, { url: url.toString(), pathname: pathname, count: 1 });
            } else {
                aggregatedData.get(key).count += 1;
            }

        } catch {
            console.log("ER")
        }
        console.log(aggregatedData);


    });

    return Array.from(aggregatedData.values());
}

