export const getDateStr = (date: string | Date = "") =>
  new Date(date).toLocaleDateString();

export const getDateTimeStr = (date: string | Date = "") =>
  new Date(date).toLocaleString();
