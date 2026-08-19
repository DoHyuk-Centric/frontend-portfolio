"use client";

import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarTriggerGate() {
  const pathname = usePathname();
  const showTrigger = !pathname.startsWith("/task");

  if (!showTrigger) {
    return null;
  }

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4!" />
    </div>
  );
}
