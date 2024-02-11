import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Event = {
    originatorid: string;
    city: string;
    type: string;
};

export default function MainItemsColumn({ events }: { events: Event[] }) {

    function countUniqueOriginatorIDs(events: Event[]): number {
        const uniqueIDs: Set<string> = new Set(events.map(event => event.originatorid));
        console.log("uniqueIDsuniqueIDsuniqueIDsuniqueIDs")
        console.log(uniqueIDs)
        return uniqueIDs.size;
    }

    function countUniqueCities(events: Event[]): number {
        const uniqueCities: Set<string> = new Set(events.map(event => event.city));
        return uniqueCities.size;
    }


    function countEventsPerType(events: Event[]): { [key: string]: number } {
        return events.reduce((acc: { [key: string]: number }, event: Event) => {
            const { type } = event; // Destructure for clarity
            acc[type] = (acc[type] || 0) + 1; // Increment event type count
            return acc;
        }, {});
    }

    const sessions = countUniqueOriginatorIDs(events)
    const cities = countUniqueCities(events)
    const types = countEventsPerType(events)

    return (
        <>
            <Card className="h-24">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Unique Sessions
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </CardHeader>
                <CardContent >
                    <div className="text-2xl font-bold">{sessions}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Unique Events
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{events.length}</div>

                </CardContent>
            </Card>
            {Object.keys(types).map((key, ind) => {
                return (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{key}</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{types[key]}</div>

                        </CardContent>
                    </Card>
                )
            })}

           
        </>
    )

}