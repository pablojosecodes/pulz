import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAnimatedCount } from "@/hooks/useAnimatedCount";
import { Event } from "@/util/typical/types";
import { useEffect, useState } from "react";
import { useCountUp } from 'use-count-up';



const TypeCard = ({ type, count }: { type: string, count: number }) => {
    const animatedCount = useAnimatedCount(count);

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                    <CardTitle className="text-sm font-medium" > {type} </CardTitle>
                    < svg
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
                <CardContent >
                    <div className="text-2xl font-bold" > {animatedCount} </div>

                </CardContent>
            </Card>
        </>


    );
};



export default function Sidebar({ events }: { events: Event[] }) {

    function countUniqueOriginatorIDs(events: Event[]): number {
        const uniqueIDs: Set<string> = new Set()
        events.forEach(event => {
            if (event.originatorid) {
                uniqueIDs.add(event.originatorid);
            }
        });
        return uniqueIDs.size;
    }

    function countUniqueCities(events: Event[]): number {
        const uniqueCities: Set<string> = new Set();
        events.forEach(event => {
            if (event.city) {
                uniqueCities.add(event.city);
            }
        });
        return uniqueCities.size;
    }

    function countEventsPerType(events: Event[]): { [key: string]: number } {
        return events.reduce((acc: { [key: string]: number }, event: Event) => {
            const { type } = event; // Destructure for clarity
            if (type) {
                acc[type] = (acc[type] || 0) + 1; // Increment event type count
            }
            return acc;
        }, {});
    }

    const [sessionCount, setSessionCount] = useState(0);
    const [citiesCount, setCitiesCount] = useState(0);
    const [count, setCount] = useState(0);

    // Update sessionCount when events change
    useEffect(() => {
        setSessionCount(countUniqueOriginatorIDs(events));
        setCitiesCount(countUniqueCities(events))
        setCount(events.length)

    }, [events]);


    const sessions = countUniqueOriginatorIDs(events)
    const cities = countUniqueCities(events)
    const types = countEventsPerType(events)
    console.log("tyzllpes")
    console.log(types)


    // Use useCountUp hook for animated counting
    const { value: animatedSessions } = useCountUp({
        isCounting: true,
        end: sessionCount,
        duration: 3.2, // Duration of the count up animation in seconds
    });


    // Use useCountUp hook for animated counting
    const { value: animatedCities } = useCountUp({
        isCounting: true,
        end: citiesCount,
        duration: 3.2, // Duration of the count up animation in seconds
    });


    // Use useCountUp hook for animated counting
    const { value: animatedCount } = useCountUp({
        isCounting: true,
        end: count,
        duration: 3.2, // Duration of the count up animation in seconds
    });




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
                    <div className="text-2xl font-bold">{animatedSessions}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Unique Cities
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
                    <div className="text-2xl font-bold">{animatedCities}</div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Events
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
                    <div className="text-2xl font-bold">{animatedCount}</div>

                </CardContent>
            </Card>

            {Object.keys(types).map((type, ind) => {
                return (

                    <TypeCard key={`${type}-${types[type]}`} type={type} count={types[type]} />
                )
            })}
        </>
    )

}