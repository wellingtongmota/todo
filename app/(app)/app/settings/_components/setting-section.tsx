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
      <div className={cn(["grid gap-3 sm:grid-cols-4 sm:gap-4", className])}>
        <h4 className="headline-4">{title}</h4>

        <div className="col-span-3">{children}</div>
      </div>
    </section>
  )
}
