import React from "react"
import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] antialiased">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
