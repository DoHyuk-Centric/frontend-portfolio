import { addDays, format, startOfDay } from "date-fns";

import type { CalendarEvent } from "@/lib/calendar-events";

type GoogleCalendarResponse = {
  items?: {
    id: string;
    summary?: string;
    start: {
      date?: string;
      dateTime?: string;
    };
    end?: {
      date?: string;
      dateTime?: string;
    };
  }[];
};

const MAX_DAYS_PER_EVENT = 366;

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    return Response.json(
      {
        message:
          "GOOGLE_CALENDAR_API_KEY와 GOOGLE_CALENDAR_ID 환경변수를 설정해 주세요.",
      },
      { status: 500 }
    );
  }

  const searchParams = new URL(request.url).searchParams;
  const timeMin = searchParams.get("timeMin");
  const timeMax = searchParams.get("timeMax");

  if (!timeMin || !timeMax) {
    return Response.json(
      { message: "timeMin과 timeMax 값이 필요합니다." },
      { status: 400 }
    );
  }

  const googleUrl = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
  );
  googleUrl.searchParams.set("key", apiKey);
  googleUrl.searchParams.set("timeMin", timeMin);
  googleUrl.searchParams.set("timeMax", timeMax);
  googleUrl.searchParams.set("timeZone", "Asia/Seoul");
  googleUrl.searchParams.set("singleEvents", "true");
  googleUrl.searchParams.set("orderBy", "startTime");
  googleUrl.searchParams.set("maxResults", "250");

  const response = await fetch(googleUrl, { next: { revalidate: 600 } });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("구글 캘린더 API 오류", response.status, errorBody);

    return Response.json(
      {
        message: `구글 캘린더에서 일정을 가져오지 못했습니다. (${response.status})`,
      },
      { status: response.status }
    );
  }

  const data: GoogleCalendarResponse = await response.json();
  const events: CalendarEvent[] = [];

  for (const item of data.items ?? []) {
    const title = item.summary ?? "(제목 없음)";

    if (item.start.date) {
      const firstDay = new Date(`${item.start.date}T00:00:00`);

      let endBoundary = addDays(firstDay, 1);
      if (item.end?.date) {
        endBoundary = new Date(`${item.end.date}T00:00:00`);
      }

      let cursor = firstDay;
      let dayCount = 0;

      while (cursor < endBoundary && dayCount < MAX_DAYS_PER_EVENT) {
        const dateKey = format(cursor, "yyyy-MM-dd");

        events.push({
          id: `${item.id}-${dateKey}`,
          title,
          date: dateKey,
          time: "",
          endTime: "",
          fullStartTime: "",
          fullEndTime: "",
          startsOnPreviousDay: false,
          isAllDay: true,
        });

        cursor = addDays(cursor, 1);
        dayCount++;
      }
    } else if (item.start.dateTime) {
      const startedAt = new Date(item.start.dateTime);

      let endedAt = startedAt;
      if (item.end?.dateTime) {
        endedAt = new Date(item.end.dateTime);
      }

      const startDateKey = format(startedAt, "yyyy-MM-dd");
      const endDateKey = format(endedAt, "yyyy-MM-dd");
      const lastDay = startOfDay(endedAt);

      const fullStartTime = format(startedAt, "HH:mm");
      const fullEndTime = format(endedAt, "HH:mm");

      let cursor = startOfDay(startedAt);
      let dayCount = 0;

      while (cursor <= lastDay && dayCount < MAX_DAYS_PER_EVENT) {
        const dateKey = format(cursor, "yyyy-MM-dd");

        let time = "00:00";
        if (dateKey === startDateKey) {
          time = format(startedAt, "HH:mm");
        }

        let endTime = "24:00";
        if (dateKey === endDateKey) {
          endTime = format(endedAt, "HH:mm");
        }

        const isEmptyLeftover = dateKey !== startDateKey && time === endTime;

        if (!isEmptyLeftover) {
          events.push({
            id: `${item.id}-${dateKey}`,
            title,
            date: dateKey,
            time,
            endTime,
            fullStartTime,
            fullEndTime,
            startsOnPreviousDay: dateKey !== startDateKey,
            isAllDay: false,
          });
        }

        cursor = addDays(cursor, 1);
        dayCount++;
      }
    }
  }

  return Response.json({ events });
}
