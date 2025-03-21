import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { geistSans } from "@/fonts"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { LoadingCircle } from "@/components/loading-circle"

export const metadata: Metadata = {
  title: "todoNookdev",
  description: "A simple todo app"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-dvh antialiased", geistSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="min-h-dvh w-full flex flex-col justify-center items-center"><LoadingCircle /></div>}>{children}</Suspense>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
