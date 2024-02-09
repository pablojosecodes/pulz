import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { DummyOverview } from "./DummyOverview"


  
  export default function Activity() {
    return (
        <Card className=" col-span-4">
            <CardHeader>
                <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <DummyOverview />
            </CardContent>
        </Card>
    )
}