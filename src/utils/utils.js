import { MONTHS_LIST } from '../constants.js';
import * as dayjs from 'dayjs';

export const createHumanizedMonthDayDate = (date) => {
  const convertedDate = new Date(date);
  const monthNumber = convertedDate.getMonth();
  const dayNumber = convertedDate.getDate();
  const humanizedMonth = MONTHS_LIST[monthNumber];

  return `${humanizedMonth} ${dayNumber}`;
};

export const addZeroBeforeNumber = (number) => `0${number}`.slice(-2);

export const filterEventsByFuture = (tripEvents) => {
  const filteredEventsByFuture = tripEvents.filter((tripEvent) => {
    const currentDate = dayjs();
    const startDate = dayjs(tripEvent.date_from);
    const endDate = dayjs(tripEvent.date_to);

    return startDate.isAfter(currentDate) || (startDate.isBefore(currentDate) && endDate.isAfter(currentDate));
  });

  return filteredEventsByFuture;
};

export const filterEventsByPast = (tripEvents) => {
  const filteredEventsByPast = tripEvents.filter((tripEvent) => {
    const currentDate = dayjs();
    const startDate = dayjs(tripEvent.date_from);
    const endDate = dayjs(tripEvent.date_to);

    return endDate.isBefore(currentDate) || (startDate.isBefore(currentDate) && endDate.isAfter(currentDate));
  });

  return filteredEventsByPast;
};
