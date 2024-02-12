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
import { timespans, useSettings } from "@/util/SettingsContext"
import { useEffect } from "react"

export default function Header() {
    const { settings, setSettings } = useSettings();

    const onChangeTimespan = (span: string) => {
        console.log("Time Span Changed: ", span);
        setSettings({
            ...settings,
            timespan: timespans[span as keyof typeof timespans],
        });
        console.log(timespans[span as keyof typeof timespans])
    };

    useEffect(() => {
        console.log("Updated Settings: ", settings);
    }, [settings]);

    return (
        <div className="flex justify-between">
            <TabsList className="relative">
                <TabsContent value="Hi">
                    HI
                </TabsContent>
                {/* ... your TabsTriggers ... */}
            </TabsList>

            <div className="flex items-center space-x-2">
                <Select onValueChange={(e) => onChangeTimespan(e)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            defaultValue="Weekly"
                            placeholder="Weekly"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="text-left">
                            <SelectLabel className="text-left">Time frame</SelectLabel>
                            <SelectItem defaultChecked value="month">Month</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="yesterday">Yesterday</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

}