import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

type LoadingCircleProp = {
  className?: string
  label?: string
}

export function LoadingCircle({ className, label }: LoadingCircleProp) {
  return (
    <div className={cn(["flex flex-col items-center gap-2", className])}>
      <LoaderCircle className="h-9 w-9 animate-spin" />
      {label && <p className="text-muted-foreground">{label}</p>}
    </div>
  )
}
