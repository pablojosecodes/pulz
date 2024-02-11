export interface Event {
    id: string;
    url: string;
    type?: string | null; // Now allows string, undefined, or null
    country?: string | null; // Now allows string, undefined, or null
    city?: string | null; // Now allows string, undefined, or null
    timestamp?: Date | null; // Now allows Date, undefined, or null
    originatorid?: string | null; // Now allows string, undefined, or null
}


export type Url = {
    url: string;
    total: number | null;
    first?: Date | null;
};



export const temporaryConfig: { [key: string]: string | string[] | undefined } = {
    APP_URL: 'https://pulz.vercel.app',
    CORS_ALLOWED_ORIGIN: ['http://localhost:3000', 'https://udara.io'],
};

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
