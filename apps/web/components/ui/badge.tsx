import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/6 text-white/80",
        accent: "border-accent/30 bg-accent/15 text-accent-soft",
        success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export function Badge({ className, variant, children }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)}>{children}</div>;
}
