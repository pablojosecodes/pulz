import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAnimatedCount } from "@/hooks/useAnimatedCount";
import { Event } from "@/util/typical/types";
import { useEffect, useState } from "react";

import { Icons } from "../ui/icons";


const TypeCard = ({ type, count }: { type: string, count: number }) => {
    const animatedCount = useAnimatedCount(count);

    const iconMap: { [key: string]: JSX.Element } = {
        "init": <Icons.create className="h-5 w-5 text-muted-foreground" />,
        "exit": <Icons.exit className="h-5 w-5 text-muted-foreground" />,
        "click": <Icons.cursor className="h-5 w-5 text-muted-foreground" />,
        "Unique Sessions": <Icons.session className="h-5 w-5 text-muted-foreground" />,
        "Unique Cities": <Icons.city className="h-5 w-5 text-muted-foreground" />,
        "Total Events": <Icons.event className="h-5 w-5 text-muted-foreground" />,
        "loaded": <Icons.loaded className="h-5 w-5 text-muted-foreground" />,
        "view": <Icons.view className="h-5 w-5 text-muted-foreground" />,
    }

    return (
        <>
            <Card>
                <CardHeader className="overflow-wrap flex flex-row items-center justify-between space-y-0 pb-2" >
                    <CardTitle className="px-[-10px] md:mx-0 text-sm  break-words max-w-full font-medium" > {type} </CardTitle>
                    <div className="hidden md:block">


                        {type in iconMap ? iconMap[type] : < svg
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
                        </svg>}
                    </div>
                </CardHeader>
                <CardContent >
                    <div className="text-2xl font-bold" >{count == 0 ? <p className="animate-pulse mt-2 h-4 w-[70%] md:w-[40%] bg-primary-foreground"></p> : animatedCount} </div>

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

    const temporary = [0, 0, 0, 0];






    return (
        <>
            <TypeCard key={`$Sessions-${sessionCount}`} type="Unique Sessions" count={sessions} />


            <TypeCard key={`$Cities-${cities}`} type="Unique Cities" count={cities} />


            <TypeCard key={`$Events-${count}`} type="Total Events" count={count} />

            {
                events.length == 0 ?

                    temporary.map((ind, i) => {
                        return (
                            <TypeCard key={`t-${i}`} type={"Loading"} count={0} />
                        )
                    })
                    :
                    Object.keys(types).map((type, ind) => {
                        return (

                            <TypeCard key={`${type}-${types[type]}`} type={type} count={types[type]} />
                        )
                    })


            }
        </>
    )

}