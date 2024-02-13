import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://pulz.vercel.app', "http://localhost:3001", "http://localhost:3002"];

export function corsMiddleware(req: NextRequest) {
    const requestOrigin = req.headers.get('origin');
	if (!requestOrigin){
		return false;
	}
    
    // Check if the request origin is in the allowed origins list
    return allowedOrigins.includes(requestOrigin)

}
