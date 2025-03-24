import { cn } from "@/lib/utils"

type SettingSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
  title: string
  children: React.ReactNode
}

export function SettingSection({
  className,
  title,
  children,
  ...props
}: SettingSectionProps) {
  return (
    <section className="grid gap-4 sm:gap-6" {...props}>
      <div className={cn(["grid gap-4 sm:grid-cols-4", className])}>
        <h3 className="headline-3">{title}</h3>

        <div className="col-span-3">{children}</div>
      </div>
    </section>
  )
}
