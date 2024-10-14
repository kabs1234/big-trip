import { MONTHS_LIST } from '../constants.js';

export const createHumanizedMonthDayDate = (date) => {
  const convertedDate = new Date(date);
  const monthNumber = convertedDate.getMonth();
  const dayNumber = convertedDate.getDate();
  const humanizedMonth = MONTHS_LIST[monthNumber];

  return `${humanizedMonth} ${dayNumber}`;
};
