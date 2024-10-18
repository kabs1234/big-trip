import { MONTHS_LIST } from '../constants.js';

export const createHumanizedMonthDayDate = (date) => {
  const convertedDate = new Date(date);
  const monthNumber = convertedDate.getMonth();
  const dayNumber = convertedDate.getDate();
  const humanizedMonth = MONTHS_LIST[monthNumber];

  return `${humanizedMonth} ${dayNumber}`;
};

export const addZeroBeforeNumber = (number) => `0${number}`.slice(-2);

export const updateTripEvent = (tripEvents, updatingTripEvent) => {
  const changingTripEventIndex = tripEvents.findIndex((tripEvent) => tripEvent.id === updatingTripEvent.id);

  if (changingTripEventIndex === -1) {
    return;
  }

  return [
    ...tripEvents.slice(0, changingTripEventIndex),
    updatingTripEvent,
    ...tripEvents.slice(changingTripEventIndex + 1),
  ];
};
