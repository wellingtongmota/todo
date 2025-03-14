import { Toaster } from "@/components/ui/sonner"
import { geistMono, geistSans } from "@/fonts"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

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
      <body className={cn("min-h-[100dvh] antialiased", geistSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
