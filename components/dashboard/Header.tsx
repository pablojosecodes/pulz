import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Button } from "../ui/button"
import { timespans, useSettings } from "@/util/globalSettings"
import { useEffect } from "react"
import { useTheme } from "next-themes"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import ThemeSwitches from "../theme/theme-switches"

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





    const onLiveChange = (checked: boolean) => {
        setSettings({ ...settings, paused: checked });
    }


    return (
        <div className="md:flex grid grid-cols-1 gap-y-2  justify-between">
            <div className="flex gap-x-2">
                <ThemeSwitches />

                
                <div className="flex items-center space-x-2">
                    <Switch className="" defaultChecked onCheckedChange={onLiveChange}
                        id="live" />
                    <Label htmlFor="live">Live <span className="md:block hidden">
                        Updates
                    </span></Label>
                </div>

            </div>

            <div className="flex items-center space-x-2">

                <p className="md:block hidden">
                    Built with <a target="_blank" className="text-foreground text-opacity-80 font-semibold hover:text-opacity-100 " href="https://github.com/pablojosecodes/pulz/">Pulz</a>
                </p>
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