import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="section-shell space-y-6 pb-16">
      <Skeleton className="h-[480px] rounded-[40px]" />
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[3/4] rounded-[28px]" />
        ))}
      </div>
    </div>
  );
}
