export function getPersianDateTime (dateValue)
{
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Asia/Tehran"
  }).format(new Date(dateValue));
}

export function getPersianDate (dateValue)
{
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(dateValue));
}

export function getTime (dateValue)
{
  return new Intl.DateTimeFormat("fa-IR", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Asia/Tehran"
  }).format(new Date(dateValue));
}

const DateTimeUtils = {
  getPersianDateTime,
  getPersianDate,
  getTime
}

export default DateTimeUtils;
