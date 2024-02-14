import { NextRequest, NextResponse } from 'next/server';
import { global_allowed_origins, global_app } from '../config';


export function corsMiddleware(req: NextRequest) {
    const requestOrigin = req.headers.get('origin');

    const host = req.headers.get('host');
    const global_host = new URL(global_app).hostname;
    
    if (host == global_host) {
        return true;
    }

    if (!requestOrigin) {
        return false;
    }

    // Check if the request origin is in the allowed origins list
    return global_allowed_origins.includes(requestOrigin)
}
