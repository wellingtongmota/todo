import { Toaster } from "@/components/ui/sonner"
import { geistMono, geistSans } from "@/fonts"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"

export const metadata: Metadata = {
  title: "Todo",
  description: "Criação de todos"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-Br" suppressHydrationWarning>
      <body
        className={cn(
          "grid min-h-dvh grid-rows-[auto_1fr_auto] antialiased",
          geistSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
