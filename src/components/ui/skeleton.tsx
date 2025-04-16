
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

// Add a skeleton for lesson discussions
function SkeletonDiscussion() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-gray-50/50 p-3 rounded-lg space-y-2">
          <Skeleton className="h-4 w-32" />
          <SkeletonText lines={2} className="mt-2" />
        </div>
      ))}
    </div>
  )
}

// Add a skeleton for lesson content
function SkeletonLesson() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-3/4" />
      <SkeletonText lines={4} />
      <div className="mt-6 p-4 bg-amber-50/50 border border-amber-200/50 rounded-md space-y-3">
        <Skeleton className="h-5 w-48" />
        <SkeletonText lines={3} />
      </div>
      <div className="mt-6 p-4 bg-blue-50/50 border border-blue-200/50 rounded-md space-y-3">
        <Skeleton className="h-5 w-48" />
        <SkeletonText lines={5} />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonDiscussion, SkeletonLesson }
