import { NextRequest, NextResponse } from 'next/server';
import { global_allowed_origins } from '../config';


export function corsMiddleware(req: NextRequest) {
    const requestOrigin = req.headers.get('origin');
	if (!requestOrigin){
		return false;
	}
    
    // Check if the request origin is in the allowed origins list
    return global_allowed_origins.includes(requestOrigin)
}
