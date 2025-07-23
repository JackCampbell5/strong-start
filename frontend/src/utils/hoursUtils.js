const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
/**
 *  Takes the hours object from the backend and returns a string representation of the hours
 * @param {object} hours - Hours object from the backend
 * @returns The string representation of the hours
 */
export function stringifyHours(hours) {
  if (hours) {
    return hours
      .map((hour, index) => {
        let startHours = new Date(Date.UTC(hours.start));
        let endHours = new Date(Date.UTC(hours.end));
        return `${days[index]}: ${formatter.format(
          startHours
        )} - ${formatter.format(endHours)}`;
      })
      .join(", ");
  }
  return "";
}
