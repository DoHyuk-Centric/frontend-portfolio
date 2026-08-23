import { format } from "date-fns";
import { ko } from "date-fns/locale";

import type { CalendarEvent } from "@/lib/calendar-events";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DaySummaryProps = {
  selectedDate: Date;
  events: CalendarEvent[];
  errorMessage: string;
};

export function DaySummary({
  selectedDate,
  events,
  errorMessage,
}: DaySummaryProps) {
  return (
    <Card className="min-h-64 min-w-0 md:min-h-0 md:flex-1">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-1">
        {errorMessage ? (
          <p className="text-sm text-destructive">{errorMessage}</p>
        ) : null}

        <p className="text-lg font-medium">
          {format(selectedDate, "yyyy년 M월 d일 EEEE", { locale: ko })}
        </p>
        <p className="text-sm text-muted-foreground">일정 {events.length}개</p>
      </CardContent>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 overflow-y-auto px-(--card-spacing)">
          {events.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {events.map((event) => {
                let timeText = "종일";

                if (!event.isAllDay) {
                  timeText = `${event.fullStartTime} ~ ${event.fullEndTime}`;

                  if (event.startsOnPreviousDay) {
                    timeText = `前 ${timeText}`;
                  }
                }

                return (
                  <li
                    key={event.id}
                    className="rounded-md bg-muted/60 px-2 py-1.5"
                  >
                    <p className="font-mono text-xs text-muted-foreground">
                      {timeText}
                    </p>
                    <p className="truncate pl-4 text-sm">{event.title}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              이 날에는 일정이 없습니다.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
