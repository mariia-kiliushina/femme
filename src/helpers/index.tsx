export const getFormatedDateFromGMTObject = (date: Date) => {
  const dateObj = date;
  let monthGMT = (dateObj.getUTCMonth() + 1).toString();
  const month = monthGMT.length < 2 ? '0' + monthGMT : monthGMT;
  let dayGMT = dateObj.getUTCDate().toString();
  const day = dayGMT.length < 2 ? '0' + dayGMT : dayGMT;
  const year = dateObj.getUTCFullYear();
  const formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
};
