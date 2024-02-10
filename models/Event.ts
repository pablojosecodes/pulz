import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

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
