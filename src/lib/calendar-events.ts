export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  fullStartTime: string;
  fullEndTime: string;
  startsOnPreviousDay: boolean;
  isAllDay: boolean;
};
