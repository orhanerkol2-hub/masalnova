export const DAILY_STORY_TIME_ZONE = 'Europe/Berlin';
export const DAILY_STORY_EPOCH = '2026-08-02';

function utcDayNumber(dateKey: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) return 0;

  const [, year, month, day] = match;
  return Math.floor(
    Date.UTC(Number(year), Number(month) - 1, Number(day)) / 86_400_000,
  );
}

export function dateKeyInTimeZone(
  date = new Date(),
  timeZone = DAILY_STORY_TIME_ZONE,
): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    calendar: 'gregory',
    day: '2-digit',
    month: '2-digit',
    numberingSystem: 'latn',
    timeZone,
    year: 'numeric',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';

  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function dailyRotationIndex(
  dateKey: string,
  itemCount: number,
  epoch = DAILY_STORY_EPOCH,
): number {
  if (itemCount <= 0) return 0;
  const dayOffset = utcDayNumber(dateKey) - utcDayNumber(epoch);
  return ((dayOffset % itemCount) + itemCount) % itemCount;
}
