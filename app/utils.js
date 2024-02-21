export const getShortDay = (dayIndex) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[dayIndex - 1];
};
