
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Add a collection of skeleton loaders for common UI patterns
function SkeletonText({ lines = 1, className = "" }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            "h-4 w-full", 
            i === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5"
          )}
        />
      ))}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={3} />
      <div className="flex space-x-3">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard }
