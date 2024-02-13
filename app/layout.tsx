'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SettingsProvider } from "@/util/globalSettings";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

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
