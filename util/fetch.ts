import { getEvents } from '@/models/Event';
import { getUrls } from '@/models/Urls';
import { Fetcher } from 'swr';

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