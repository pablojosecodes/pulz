'use client'

import { Metadata } from "next"

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

import { PathGrid } from "./dashboard/PathGrid"
import MainItemsColumn from "./dashboard/MainItems"
import Activity from "./dashboard/Activity"
import Header from "./dashboard/Header"
import { ButtonIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { DataTable } from "./DataTable"



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage({ data, filteredEvents }: { data: any, filteredEvents: any }) {
  return (
    <div className="hidden  w-full flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="all" className="space-y-4">

          <Header />
          {/* <Button onClick={async () => await testit()}>
            CLICK EMM
          </Button> */}
          <Button onClick={async () => {

            const d = await fetch("/api/create-originator", {
              method: "POST"
            })
            // console.log(d)
            console.log(filteredEvents)
          }}>
            CLICK ME
          </Button>


          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="col-span-1 grid gap-y-2">
                <MainItemsColumn />
              </div>
              <div className="  col-span-4">
                <Activity />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Popular paths</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <PathGrid />
                    </CardContent>
                  </Card>
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Popular paths</CardTitle>
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
