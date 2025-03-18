import { Skeleton } from "./ui/skeleton"

export function BlockListSkeleton() {
  return (
    <div className="grid space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[70px] w-full rounded-md" />
      ))}
    </div>
  )
}
