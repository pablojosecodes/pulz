

// Define the type for a single event
export type Event = {
    id: string;
    url: string | null;
    type: string | null;
    country: string | null;
    city: string | null;
    timestamp: Date | null;
    originatorid: string | null;
};


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

export type DataItem = {
    id: string;
    url: string;
    pathname: string;
    type: string;
    country?: string;
    city?: string;
    timestamp: string;
    originatorid: string;
};



// Update the type for chart data to include dayOfWeek
// export type BasicChartData = {
//     date: string;
//     dayOfWeek: string;
//     events: number;
// };
export type BasicChartData = {
    date?: string;  // Making date optional as well, as it's not used in hourly data
    events: number;
    dayOfWeek?: string;
    month?: string;
    dayOfMonth?: number;
    time?: string;  // Add this for hourly data
  };
  