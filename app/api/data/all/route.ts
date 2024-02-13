import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';

import { corsHeaders } from '@/util/typical/types';
import { queryData } from '@/util/data';
import { global_app } from '@/util/config';
import { corsMiddleware } from '@/util/typical/middle';

const defaultTimespan = {
	start: moment().subtract(24, 'hours').toDate(),
	end: moment().toDate(),
};

export async function GET(
	req: NextRequest,
	res: NextResponse
) {
	const allowedDomain = await corsMiddleware(req)
	if (!allowedDomain) {
		return NextResponse.json({ message: 403 });
	}

	const url: URL = new URL(`${global_app}${req.url}`);

	const start = url.searchParams.get('start');
	const end = url.searchParams.get('end');
	const filter = url.searchParams.get('filter');

	const params = {
		start: start ? moment.utc(start).toDate() : defaultTimespan.start,
		end: end ? moment.utc(end).toDate() : defaultTimespan.end,
		filter: filter,
	};

	const data = await queryData(params.start, params.end, <string>params.filter);
	return NextResponse.json(data, { headers: corsHeaders })

}

