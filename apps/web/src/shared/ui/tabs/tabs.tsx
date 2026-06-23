import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/shared/lib/utils";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-surface relative inline-flex w-fit items-center gap-1 rounded-3xl p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-[1.75rem] px-3",
        "md:h-11 md:gap-1.5 md:px-5",
        "text-ink/70 text-small font-bold whitespace-nowrap transition-colors",
        "hover:text-ink hover:data-active:text-surface",
        "focus-visible:ring-brand-400/40 focus-visible:ring-4 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-active:bg-brand-400 data-active:text-surface data-active:shadow-brand",
        "uppercase [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
