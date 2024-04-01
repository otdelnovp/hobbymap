export const getDateStr = (date: string | Date = "") =>
  new Date(date).toLocaleString("ru");
