import type { NextApiRequest, NextApiResponse } from 'next';
// import corsMiddleware from '@/utils/corsMiddleware';
// import { getEvents } from '@/models/Events';
import { getUrls } from '@/models/Urls';
import moment from 'moment'; 

import { config } from '@/lib/config';
import { getEvents } from '@/models/Event';

const defaultTimespan = {
	start: moment().subtract(24, 'hours').toDate(),
	end: moment().toDate(),
};

async function queryData(
	start: Date,
	end: Date,
	filter: string | string[] | undefined
) {
	const events = await getEvents(start, end, filter);
	const urls = await getUrls(start, end, filter);

	return { events, urls };
}

export async function GET(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// await corsMiddleware(req, res);

	const url = `${config.APP_URL}${req.url}`;
	const _url: URL = new URL(url);

	const start = _url.searchParams.get('start');
	const end = _url.searchParams.get('end');
	const filter = _url.searchParams.get('filter');

	const params = {
		start: start ? moment.utc(start).toDate() : defaultTimespan.start,
		end: end ? moment.utc(end).toDate() : defaultTimespan.end,
		filter: filter,
	};

	const data = await queryData(params.start, params.end, <string>params.filter);
    console.log(data)
    return Response.json({ message: 200 })

	// res.status(200).json(data);
}

// curl 'http://localhost:3000/api/path?start=2024-02-01T00:00:00Z&end=2024-02-02T00:00:00Z&filter=someFilterValue'


// curl "http://localhost:3000/api/data/all?start="
