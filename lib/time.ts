const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const DIVISIONS = [
  { amount: 60, unit: "second" as const },
  { amount: 60, unit: "minute" as const },
  { amount: 24, unit: "hour" as const },
  { amount: 7, unit: "day" as const },
  { amount: 4.34524, unit: "week" as const },
  { amount: 12, unit: "month" as const },
  { amount: Infinity, unit: "year" as const },
];

export function formatTimeAgo(
  input: string | Date | null | undefined
): { label: string; iso: string } | null {
  if (!input) {
    return null;
  }

  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  let duration = (date.getTime() - Date.now()) / 1000;
  let unit: Intl.RelativeTimeFormatUnit = "second";

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      break;
    }
    duration /= division.amount;
    unit = division.unit;
  }

  return {
    label: rtf.format(Math.round(duration), unit),
    iso: date.toISOString(),
  };
}
