import AbstractView from '../framework/view/abstract-view.js';
import { createHumanizedMonthDayDate } from '../utils/utils.js';

const createTripCost = (tripEvents, tripOffers) => {
  const tripTotalCost = tripEvents.reduce((accumulator, tripEvent) => {
    const tripOffer = tripOffers.find((element) => element.type === tripEvent.type).offers;
    const tripOffersCost = tripEvent.offers.reduce((acc, offerId) => acc + tripOffer[offerId-1].price, 0);

    return accumulator + tripEvent.base_price + tripOffersCost;
  }, 0);

  return (`
    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${tripTotalCost}</span>
    </p>
  `);
};

const sortEventsByDay = (tripEvents) => {
  const sortedTripEventsByDay = tripEvents.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));

  return sortedTripEventsByDay;
};

const createTripTitle = (tripEvents) => {
  if (tripEvents.length === 0) {
    return '';
  }

  const sortedEventsByDay = sortEventsByDay(tripEvents);
  const tripEventsDestinations = sortedEventsByDay.map((tripEvent) => tripEvent.destination.name);

  if (tripEventsDestinations.length === 1) {
    return `<h1 class="trip-info__title">${tripEventsDestinations[0]}`;
  }

  if (tripEventsDestinations.length > 3) {
    return `<h1 class="trip-info__title">${tripEventsDestinations[0]} — ... — ${tripEventsDestinations.slice(-1)}</h1>`;
  }

  return `<h1 class="trip-info__title">${tripEventsDestinations[0]} — ${tripEventsDestinations[1]} ${tripEventsDestinations.length === 3 ? `— ${tripEventsDestinations[2]}` : ''}</h1>`;
};

const createTripDates = (tripEvents) => {
  if (tripEvents.length === 0) {
    return '';
  }

  const sortedEventsByDay = sortEventsByDay(tripEvents);

  const startDate = sortedEventsByDay[0].date_from;
  const convertedStartDate = new Date(startDate);
  const startDateMonth = convertedStartDate.getMonth();
  const humanizedStartDate = createHumanizedMonthDayDate(startDate);

  const endDate = sortedEventsByDay.slice(-1)[0].date_to;
  const convertedEndDate = new Date(endDate);

  const endDateMonth = convertedEndDate.getMonth();
  let humanizedEndDate;

  if (startDateMonth === endDateMonth) {
    humanizedEndDate = convertedEndDate.getDate();
  } else {
    humanizedEndDate = createHumanizedMonthDayDate(endDate);
  }

  return `<p class="trip-info__dates">${humanizedStartDate} &nbsp;—&nbsp;${humanizedEndDate}</p>`;
};

const createTripTitleAndDate = (tripEvents) => (`
  <div class="trip-info__main">
    ${createTripTitle(tripEvents)}

    ${createTripDates(tripEvents)}
  </div>
`);

export const createTripInfoTemplate = (tripEvents, tripOffers) => (`
  <section class="trip-main__trip-info  trip-info">
    ${createTripTitleAndDate(tripEvents)}
    ${createTripCost(tripEvents, tripOffers)}
  </section>
`);

export default class TripInfoView extends AbstractView {
  #tripEvents = null;
  #tripOffers = null;

  constructor(tripEvents, tripOffers) {
    super();
    this.#tripEvents = tripEvents;
    this.#tripOffers = tripOffers;
  }

  get template() {
    return createTripInfoTemplate(this.#tripEvents, this.#tripOffers);
  }
}
