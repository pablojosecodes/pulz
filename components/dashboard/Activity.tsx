import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { DummyOverview } from "./dummyOverview"

  
  export default function Activity() {
    return (
        <Card className="h-full col-span-4">
            <CardHeader>
                <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <DummyOverview />
            </CardContent>
        </Card>
    )
}