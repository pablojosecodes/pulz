import { createEvent } from '@/models/Event';
import { paramsForOriginator } from '@/models/Originators';
import { corsMiddleware } from '@/util/typical/middle';
import { corsHeaders } from '@/util/typical/types';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest, response: NextResponse) {
    const allowedDomain = await corsMiddleware(request)
    if (!allowedDomain) {
        return NextResponse.json({ message: 403 });
    }

    
    let { type, url, originatorId, country, city, error } =
        await paramsForOriginator(request);
    const d = await createEvent(type, url, originatorId, country, city);
    return NextResponse.json({ message: 200 }, { headers: corsHeaders })
}
