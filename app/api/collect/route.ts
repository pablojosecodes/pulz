import { createEvent } from '@/models/Event';
import { paramsForOriginator } from '@/models/Originators';
import { corsHeaders } from '@/util/types';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    let { type, url, originatorId, country, city, error } =
        await paramsForOriginator(request);
    const d = await createEvent(type, url, originatorId, country, city);
    return NextResponse.json({ message: 200 }, { headers: corsHeaders })
}
