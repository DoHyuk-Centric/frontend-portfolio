import { ko } from "date-fns/locale";

import type { CalendarEvent } from "@/lib/calendar-events";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

const START_MONTH = new Date(2025, 0);
const END_MONTH = new Date(2030, 11);

const MODIFIERS_CLASS_NAMES = {
  hasEvent:
    "relative after:absolute after:bottom-1 after:left-1/2 after:z-10 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-colors after:duration-300 data-[selected=true]:after:bg-primary-foreground",
};

type MonthCalendarProps = {
  events: CalendarEvent[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  month: Date;
  onMonthChange: (month: Date) => void;
};

export function MonthCalendar({
  events,
  selectedDate,
  onSelectDate,
  month,
  onMonthChange,
}: MonthCalendarProps) {
  const eventDates: Date[] = [];
  for (const event of events) {
    eventDates.push(new Date(`${event.date}T00:00:00`));
  }

  return (
    <Card className="w-fit shrink-0 self-center md:self-auto">
      <CardContent>
        <Calendar
          mode="single"
          required
          selected={selectedDate}
          onSelect={onSelectDate}
          month={month}
          onMonthChange={onMonthChange}
          locale={ko}
          captionLayout="dropdown"
          startMonth={START_MONTH}
          endMonth={END_MONTH}
          modifiers={{ hasEvent: eventDates }}
          modifiersClassNames={MODIFIERS_CLASS_NAMES}
          className="[--cell-size:--spacing(9)] **:data-day:transition-colors **:data-day:duration-300 [&_[data-selected-single=true]:hover]:bg-primary [&_[data-selected-single=true]:hover]:text-primary-foreground"
        />
      </CardContent>
    </Card>
  );
}
