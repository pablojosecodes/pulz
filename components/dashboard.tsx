'use client'

import { Metadata } from "next"


// Settings
import { useSettings, timespans } from "@/components/SettingsContext";

// Components
import { PathGrid } from "@/components/dashboard/PathGrid"
import MainItemsColumn from "@/components/dashboard/MainItems"
import Activity from "@/components/dashboard/Activity"
import Header from "@/components/dashboard/Header"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DataItem, DataTable } from "@/components/DataTable"



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage({ data, filteredEvents }: { data: any, filteredEvents: any }) {
  const { settings, setSettings } = useSettings();


  function aggregateDataByPathname(filteredEvents: DataItem[]) {
    const aggregatedData = new Map();

    filteredEvents.forEach((item: DataItem) => {
      console.log(item.url)
      try {
        const url = new URL(item.url);
        const pathname = url.pathname;
        console.log(url)
        const key = `${url} ${pathname}`;

        if (!aggregatedData.has(key)) {
          aggregatedData.set(key, { url: url.toString(), pathname: pathname, count: 1 });
        } else {
          aggregatedData.get(key).count += 1;
        }

      } catch {
        console.log("ER")
      }
      console.log(aggregatedData);
      // Assuming 'url' can be parsed to get 'pathname'

    });

    return Array.from(aggregatedData.values());
  }

  const onChangeTimespan = (span: string) => {
    // console.log(Timespa)
    console.log("timespans[span as keyof typeof timespans]")
    // console.log(timespans[span as keyof typeof timespans])
    setSettings({
      ...settings,
      timespan: timespans[span as keyof typeof timespans],
    });
    console.log("UPDATED")

  };
  console.log()
  console.log(filteredEvents)



  return (
    <div className="w-full flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="all" className="space-y-4">
          <Header />

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
              <div className="col-span-1 gap-x-2">
                <MainItemsColumn events={filteredEvents} />
              </div>
              <div className=" gap-y-2 grid col-span-4">
                <Activity events={filteredEvents} />
                <div className="flex  gap-x-2 ƒflex-wrap md:flex-nowrap">
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>Popular paths</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <PathGrid data={aggregateDataByPathname(filteredEvents)} />
                    </CardContent>
                  </Card>
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>Recent Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <DataTable data={filteredEvents} />
                    </CardContent>
                    <Button onClick={() => console.log(filteredEvents)}> CLICK </Button>
                  </Card>
                </div>

              </div>
            </div>



          </TabsContent>
        </Tabs>
      </div>
    </div >

  )
}


// SELECT originatorid, COUNT(*)
// FROM event
// GROUP BY originatorid;
