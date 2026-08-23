"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

const CalendarView = dynamic(
  () => import("./calendar-view").then((mod) => mod.CalendarView),
  {
    ssr: false,
    loading: () => <Skeleton className="mx-auto h-96 w-full max-w-3xl" />,
  }
);

export function CalendarViewLoader() {
  return <CalendarView />;
}
