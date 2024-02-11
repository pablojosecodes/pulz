import { NextRequest } from "next/server";

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
