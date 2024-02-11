import type { NextApiRequest, NextApiResponse } from 'next';
// import corsMiddleware from '@/utils/corsMiddleware';
// import { getEvents } from '@/models/Events';
import { getUrls } from '@/models/Urls';
import moment from 'moment';

import { config } from '@/lib/config';
import { getEvents } from '@/models/Event';

const defaultTimespan = {
	start: moment().subtract(100, 'hours').toDate(),
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

	console.log("PARAMS1")
	console.log(_url.searchParams)

	const params = {
		start: start ? moment.utc(start).toDate() : defaultTimespan.start,
		end: end ? moment.utc(end).toDate() : defaultTimespan.end,
		filter: filter,
	};

	// const params = {
	// 	start: new Date("2020-02-09T23:50:02.114Z"),
	// 	end: new Date("2028-02-09T23:50:02.114Z"),
	// 	filter: filter,

	// }
	console.log("PARAMSZ")
	console.log(params)

	// {
	// 	start: 2024-02-10T00:00:00.000Z,
	// 	end: 2024-02-10T23:59:59.000Z,
	// 	filter: null
	//   }

	//   {
	// 	start: 2024-02-10T00:00:00.000Z,
	// 	end: 2024-02-10T23:59:59.000Z,
	// 	filter: null
	//   }
	//   {
	// 	start: 2024-02-10T00:00:00.000Z,
	// 	end: 2024-02-10T23:59:59.000Z,
	// 	filter: null
	//   }
			
	// {
	// 	start: 2024-02-10T00:00:00.000Z,
	// 	end: 2024-02-10T23:59:59.000Z,
	// 	filter: null
	//   }
	  

	const data = await queryData(params.start, params.end, <string>params.filter);

	// console.log("STARTING DATAZZZZ")
	// console.log(data)
	// console.log("ENDING DATAZZZZ")
	return Response.json(data)

	// res.status(200).json(data);
}

// curl 'http://localhost:3000/api/data/all?start=2024-02-10T01:00:00Z&end=2024-02-10T02:00:00Z'


// curl "http://localhost:3000/api/data/all?start="
