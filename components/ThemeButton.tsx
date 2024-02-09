"use client"; 
import { MoonIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes"

export default function ThemeButton() {
    const { setTheme } = useTheme()

    return (
        <>
            <button className="dark:hidden block" onClick={() => setTheme("dark")} >
                <MoonStarIcon />
            </button >
            <button className="hidden dark:block" onClick={() => setTheme("light")} >
                <SunIcon />
            </button >
        </>
    )
}