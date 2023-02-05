export const formatDateToString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
};
