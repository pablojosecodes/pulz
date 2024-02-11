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
import ThemeButton from "../theme/ThemeButton"
import { Button } from "../ui/button"
  
  export default function Header() {
    return (
        <div className="flex justify-between">
            <TabsList className="relative">
                <TabsTrigger value="all">
                    Light
                </TabsTrigger>
                <TabsTrigger value="Home">
                    Dark
                </TabsTrigger>
                <TabsTrigger value="Reference">
                    Hacker News
                </TabsTrigger>
                <TabsTrigger value="notifications">
                    Dark v2
                </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
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

            </div>
        </div>
    )
}