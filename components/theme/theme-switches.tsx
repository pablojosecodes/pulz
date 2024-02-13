import {
    TabsList,
} from "@/components/ui/tabs"

import { useTheme } from "next-themes"
import { Button } from "../ui/button"



export default function ThemeSwitches() {

    const { theme, setTheme } = useTheme()
    return (
        <TabsList className="relative">
            <Button className={` bg-transparent hover:bg-transparent ${theme == "light" ? "text-neutral-900" : "text-neutral-400"}`} onClick={() => setTheme("light")} value="Default">Base</Button>
            <Button className={`bg-transparent hover:bg-transparent  ${theme == "dark" ? "text-neutral-200" : "text-neutral-400"}`} onClick={() => setTheme("dark")} value="Dark">Dark</Button>
            <Button className={`bg-transparent hover:bg-transparent  ${theme == "hn" ? "text-neutral-800" : "text-neutral-400"}`} onClick={() => setTheme("hn")} value="HN">HN</Button>
        </TabsList>

    )
}