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
    <>
      <SidebarTrigger className="hidden lg:flex" />
      <Separator orientation="vertical" className="hidden h-4! lg:block" />
    </>
  );
}
