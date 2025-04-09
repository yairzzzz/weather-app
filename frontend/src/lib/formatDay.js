export const formatDay = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "Europe/Bucharest",
  });
};
