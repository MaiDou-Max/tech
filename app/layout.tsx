import "../styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

function RootLayout({ children }) {
    return (
        <html>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                {children}
            </body>
        </html>
    )
}

export default RootLayout;
