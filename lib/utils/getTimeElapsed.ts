import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from "date-fns";

export function getTimeElapsed(dateString: string): string {
  const date = parseISO(dateString);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  if (minutes < 1) return "0 min";
  if (minutes < 60) return `${minutes} min`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""}`;

  const days = differenceInDays(now, date);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""}`;

  const months = differenceInMonths(now, date);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;

  const years = differenceInYears(now, date);
  return `${years} year${years > 1 ? "s" : ""}`;
}
