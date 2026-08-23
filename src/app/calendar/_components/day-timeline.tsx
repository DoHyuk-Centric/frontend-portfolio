import type { CalendarEvent } from "@/lib/calendar-events";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function toMinutes(time: string) {
  const hour = Number(time.slice(0, 2));
  const minute = Number(time.slice(3, 5));

  return hour * 60 + minute;
}

type DayTimelineProps = {
  events: CalendarEvent[];
};

export function DayTimeline({ events }: DayTimelineProps) {
  const morningRows = [];
  const afternoonRows = [];

  for (let slotIndex = 0; slotIndex < 96; slotIndex++) {
    const slotStart = slotIndex * 15;
    const slotEnd = slotStart + 15;
    const isHourStart = slotStart % 60 === 0;

    let slotLabel = "";
    if (isHourStart) {
      slotLabel = String(slotStart / 60).padStart(2, "0") + ":00";
    }

    let coveringEvent: CalendarEvent | undefined = undefined;
    let isEventStart = false;

    for (const event of events) {
      if (event.isAllDay) {
        continue;
      }

      const eventStart = toMinutes(event.time);
      let eventEnd = toMinutes(event.endTime);

      if (eventEnd <= eventStart) {
        eventEnd = eventStart + 15;
      }

      if (eventStart < slotEnd && eventEnd > slotStart) {
        coveringEvent = event;
        isEventStart = eventStart >= slotStart && eventStart < slotEnd;
      }
    }

    let fillClassName = "relative min-w-0 flex-1 border-t px-1.5 ";
    if (isHourStart) {
      fillClassName += "border-border ";
    } else {
      fillClassName += "border-border/40 ";
    }
    if (coveringEvent) {
      fillClassName += "bg-primary/20";
    }

    let labelClassName =
      "w-11 shrink-0 pr-1 text-right font-mono text-[10px] leading-4 text-muted-foreground ";
    if (isHourStart) {
      labelClassName += "border-t border-border";
    }

    const slotRow = (
      <div key={slotIndex} className="flex h-4">
        <span className={labelClassName}>{slotLabel}</span>

        <div className={fillClassName}>
          {isEventStart && coveringEvent ? (
            <span className="absolute inset-x-1.5 top-0 z-10 line-clamp-3 text-[11px] leading-4 font-medium">
              {coveringEvent.title}
            </span>
          ) : null}
        </div>
      </div>
    );

    if (slotIndex < 48) {
      morningRows.push(slotRow);
    } else {
      afternoonRows.push(slotRow);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            {morningRows}
            <div className="flex h-4">
              <span className="w-11 shrink-0 border-t border-border pr-1 text-right font-mono text-[10px] leading-4 text-muted-foreground">
                12:00
              </span>
              <div className="min-w-0 flex-1 border-t border-border" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            {afternoonRows}
            <div className="flex h-4">
              <span className="w-11 shrink-0 border-t border-border pr-1 text-right font-mono text-[10px] leading-4 text-muted-foreground">
                24:00
              </span>
              <div className="min-w-0 flex-1 border-t border-border" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
