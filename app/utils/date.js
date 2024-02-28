export const getShortDay = (dayIndex) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[dayIndex - 1];
};

export const getTimeString = (date) => {
  const hours = date.getHours().toString().padStart(2, 0);
  const minutes = date.getMinutes().toString().padStart(2, 0);
  return `${hours}:${minutes}`;
};
