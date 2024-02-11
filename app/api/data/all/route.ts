import moment from 'moment';
import { config } from '@/util/config';
import { NextRequest, NextResponse } from 'next/server';
import { corsHeaders } from '@/util/typical/types';
import { queryData } from '@/util/data';


const defaultTimespan = {
	start: moment().subtract(100, 'hours').toDate(),
	end: moment().toDate(),
};

export async function GET(
	req: NextRequest,
	res: NextResponse
) {
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
	return NextResponse.json(data, { headers: corsHeaders })

}

