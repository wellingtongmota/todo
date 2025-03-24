"use client"

import { GlowEffect } from "@/components/motion-primitives/glow-effect"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Rocket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="overflow-hidden">
      <div className="relative pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl text-center sm:mx-auto lg:mt-0 lg:mr-auto lg:w-4/5">
            <h1 className="mt-8 text-4xl font-semibold text-balance md:text-5xl xl:text-6xl xl:[line-height:1.125]">
              Manage Your Tasks Efficiently with todo
              <span className="text-primary">Nookdev.</span>
            </h1>
            <p className="mx-auto mt-8 hidden max-w-2xl text-lg text-wrap sm:block">
              TodoNookdev helps you stay organized and manage your tasks
              effectively with a simple and intuitive interface.
            </p>

            <div className="relative mx-auto mt-8 w-fit">
              <GlowEffect
                colors={["#FF5733", "#33FF57", "#3357FF", "#7C3AED"]}
                mode="colorShift"
                blur="strong"
                duration={3}
                scale={0.9}
              />
              <Link
                href="/sign-in"
                className={cn([buttonVariants({ size: "lg" }), "relative"])}
              >
                <Rocket /> Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mt-16">
          <div
            aria-hidden
            className="to-background absolute inset-0 z-10 bg-linear-to-b from-transparent from-35%"
          />
          <div className="relative mx-auto max-w-6xl overflow-hidden px-4">
            <Image
              className="relative z-2 hidden rounded-2xl border dark:block"
              src="/todo.png"
              alt="TodoNookdev app screen"
              width={2796}
              height={2008}
            />
            <Image
              className="relative z-2 rounded-2xl border dark:hidden"
              src="/todo-light.png"
              alt="TodoNookdev app screen"
              width={2796}
              height={2008}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
