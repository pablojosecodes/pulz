import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import ThemeButton from "../ThemeButton"
import { Button } from "../ui/button"
  
  export default function Header() {
    return (
        <div className="flex justify-between">
            <TabsList className="relative">
                <TabsTrigger value="all">
                    All
                </TabsTrigger>
                <TabsTrigger value="Home">
                    Home
                </TabsTrigger>
                <TabsTrigger value="Reference">
                    Reference
                </TabsTrigger>
                <TabsTrigger value="notifications">
                    Notifications
                </TabsTrigger>

                <QuestionMarkIcon className="text-[#64748B] cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm mx-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50   data-[state=active]:shadow-sm" />

            </TabsList>

            <div className="flex items-center space-x-2">

                <ThemeButton />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue defaultValue="Weekly" placeholder="Weekly" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="text-left ">
                            <SelectLabel className="text-left">Time frame</SelectLabel>
                            <SelectItem defaultChecked value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button>Download</Button>
            </div>
        </div>
    )
}