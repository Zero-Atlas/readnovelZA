export function compareTime(time1, time2) {
  const [year, month, day, hour, minute] = [
    time1.getFullYear() - time2.getFullYear(),
    time1.getMonth() - time2.getMonth(),
    time1.getDate() - time2.getDate(),
    time1.getHours() - time2.getHours(),
    time1.getMinutes() - time2.getMinutes(),
  ];
  if (year !== 0) return year + " year";
  if (month !== 0) return month + " month";
  if (day !== 0) return day + " day";
  if (hour !== 0) return hour + " hour";
  return minute + " minute";
}
