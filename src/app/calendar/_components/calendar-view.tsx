"use client";

import { useEffect, useState } from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";

import type { CalendarEvent } from "@/lib/calendar-events";
import { MonthCalendar } from "./month-calendar";
import { DaySummary } from "./day-summary";
import { DayTimeline } from "./day-timeline";

export function CalendarView() {
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timeMin = startOfMonth(visibleMonth).toISOString();
    const timeMax = endOfMonth(visibleMonth).toISOString();
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const response = await fetch(
          `/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`,
          { signal: controller.signal }
        );
        const data: { events?: CalendarEvent[]; message?: string } =
          await response.json();

        if (controller.signal.aborted) {
          return;
        }

        if (!response.ok) {
          setEvents([]);
          setErrorMessage(data.message ?? "일정을 불러오지 못했습니다.");
          return;
        }

        setEvents(data.events ?? []);
        setErrorMessage("");
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setEvents([]);
        setErrorMessage("일정을 불러오지 못했습니다.");
      }
    }

    loadEvents();

    return () => {
      controller.abort();
    };
  }, [visibleMonth]);

  const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
  const selectedEvents: CalendarEvent[] = [];

  for (const event of events) {
    if (event.date === selectedDateKey) {
      selectedEvents.push(event);
    }
  }

  function handleSelectDate(date: Date) {
    if (format(date, "yyyy-MM-dd") === selectedDateKey) {
      return;
    }

    setSelectedDate(date);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
        <MonthCalendar
          events={events}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          month={visibleMonth}
          onMonthChange={setVisibleMonth}
        />

        <DaySummary
          selectedDate={selectedDate}
          events={selectedEvents}
          errorMessage={errorMessage}
        />
      </div>

      <DayTimeline events={selectedEvents} />
    </div>
  );
}
