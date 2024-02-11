
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import FuzzySearch from 'fuzzy-search';

const prisma = new PrismaClient();

interface Event {
    id: string;
    url: string;
    type?: string | null; // Now allows string, undefined, or null
    country?: string | null; // Now allows string, undefined, or null
    city?: string | null; // Now allows string, undefined, or null
    timestamp?: Date | null; // Now allows Date, undefined, or null
    originatorid?: string | null; // Now allows string, undefined, or null
}


export const createEvent = async (
    type: string,
    url: string,
    originatorId: string,
    country: string = 'undefined',
    city: string = 'undefined'
) => {
    // Check if the originator exists
    const originatorExists = await prisma.originator.findUnique({
        where: { id: originatorId },
    });

    if (!originatorExists) {
        // Handle the case where the originator does not exist.
        // For example, throw an error or create a new originator.
        throw new Error('Originator does not exist');
    }


    // Create or update the URL model
    const urlModel = await prisma.url.upsert({
        where: { url: url },
        update: { total: { increment: 1 } },
        create: { url: url, first: new Date() },
    });

    // Create or update the Location model
    const locationModel = await prisma.location.upsert({
        where: { city: city },
        update: { total: { increment: 1 } },
        create: { city: city, country: country, first: new Date() },
    });

    // Create the Event
    const event = await prisma.event.create({
        data: {
            id: nanoid(9),
            url: url,
            type: type || 'view',  // Using default value 'view' if type is not provided
            country: country,
            city: city,
            timestamp: new Date(),
            originatorid: originatorId,
        },
    });

    return event.id;
};


//   // Assuming Originator is another model, you need to define it as well.
//   interface Originator {
//     // Define the properties of the Originator model here
//   }


export const getEvents = async (
    start: Date,
    end: Date,
    filter: string | string[] | undefined
): Promise<Event[]> => {
    let events = await prisma.event.findMany({
        where: {
            timestamp: {
                gte: start,
                lte: end,
            },
        },
        take: 10000,
        orderBy: { timestamp: 'desc' },
    });

    if (filter) {
        const searcher = new FuzzySearch(events, ['url', 'type'], {
            caseSensitive: false,
            sort: true,
        });

        events = searcher.search(<string>filter);
    }

    return events;
};

// SELECT *
// FROM event
// ORDER BY timestamp DESC
// LIMIT 10;
