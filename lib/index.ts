const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // Example of inserting dummy data into the 'originator' table
    const newOriginator = await prisma.originator.create({
        data: {
            id: 'dummy-id1', // Replace with your dummy id
            origin: 'dummy-origin' // Replace with your dummy origin
            // timestamp is generated automatically
        },
    });
    console.log('Inserted new originator:', newOriginator);

    // Example of inserting dummy data into the 'event' table
    const newEvent = await prisma.event.create({
        data: {
            id: 'dummy-event-id', // Replace with your dummy id
            url: 'http://dummyurl.com', // Replace with your dummy URL
            // Other fields can have default values or you can specify them
        },
    });
    console.log('Inserted new event:', newEvent);

    // Example of inserting dummy data into the 'location' table
    const newLocation = await prisma.location.create({
        data: {
            city: 'Dummy City', // Replace with your dummy city
            country: 'Dummy Country', // Replace with your dummy country
            // Other fields can have default values or you can specify them
        },
    });
    console.log('Inserted new location:', newLocation);

    // Example of inserting dummy data into the 'url' table
    const newUrl = await prisma.url.create({
        data: {
            url: 'http://dummyurl.com', // Replace with your dummy URL
            // Other fields can have default values or you can specify them
        },
    });
    console.log('Inserted new URL:', newUrl);
}

// originator {
//     id        String    @id @db.VarChar
//     origin    String    @db.VarChar
//     timestamp DateTime? @default(now()) @db.Timestamp(6)
//     event     event[]
//   }


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })