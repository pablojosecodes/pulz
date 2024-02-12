'use client'

import { Metadata } from "next"

// Components
import { Paths } from "@/components/dashboard/Paths"
import Sidebar from "@/components/dashboard/Sidebar"
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

import { Logs } from "@/components/dashboard/Logs"
import { aggregateDataByPathname } from "@/util/data";

import Activity from "./dashboard/Activity"
import ThemeButton from "./theme/ThemeButton"


export default function Dashboard({ filteredEvents }: { filteredEvents: any }) {


  return (
    <div className="w-full flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="all" className="space-y-4">

          <Header />

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-5">

              <div className="col-span-1 grid lg:grid-cols-1 grid-cols-3 gap-x-2">
                <Sidebar events={filteredEvents} />
              </div>

              <div className=" gap-y-2 grid col-span-4">

                <Card className="bg-white ">
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="max-w-full  overflow-x-auto pl-2">
                    <Activity events={filteredEvents} />
                  </CardContent>
                </Card>

                <div className="grid lg:flex max-w-full  overflow-x overflow-x-auto  gap-x-2 lg:flex-wrap lg:flex-nowrap">

                  <Card className="max-w-full lg:flex-1">
                    <CardHeader>
                      <CardTitle>Popular paths</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Paths data={aggregateDataByPathname(filteredEvents)} />
                    </CardContent>
                  </Card>

                  <Card className="max-w-full lg:flex-1">
                    <CardHeader>
                      <CardTitle>Recent Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Logs data={filteredEvents} />
                    </CardContent>
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