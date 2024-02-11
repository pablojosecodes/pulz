import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ActivityBoard from "./DummyOverview"



// Define the type for a single event
type Event = {
    city: string;
    country: string;
    id: string;
    originatorid: string;
    timestamp: string;
    type: string;
    url: string;
};

// Define the props for the component
type MyComponentProps = {
    events: Event[];
};

// Define the type for chart data
type ChartData = {
    date: string;
    events: number;
};



const Activity: React.FC<MyComponentProps> = ({ events }) => {
    return (
        <Card className=" col-span-4">
            <CardHeader>
                <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ActivityBoard events={events} />
            </CardContent>
        </Card>
    )
};

export default Activity;