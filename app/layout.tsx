'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SettingsProvider } from "@/util/SettingsContext";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <script src="collectit.js" defer></script>

      <body className={inter.className}>

        <SettingsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="hn"
            disableTransitionOnChange
          >
            {children}

          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html >
  );
}
