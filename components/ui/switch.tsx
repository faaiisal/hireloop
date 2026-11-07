import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border border-white/15 bg-[#1F1F1F] px-1 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-[#5C53FE]/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-[#5C53FE] data-checked:bg-[#5C53FE]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-7 rounded-full bg-white transition-transform group-data-checked:translate-x-7"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
