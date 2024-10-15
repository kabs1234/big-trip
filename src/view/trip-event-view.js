import AbstractView from '../framework/view/abstract-view.js';
import { addZeroBeforeNumber, createHumanizedMonthDayDate } from '../utils/utils.js';

const createTimeDifference = (startDate, endDate) => {
  const ONE_HOUR_IN_MILLISECONDS = 3.6e6;
  const ONE_DAY_IN_MILLISECONDS = 8.64e7;

  const timeDifference = new Date(endDate) - new Date(startDate);

  if (timeDifference <= ONE_HOUR_IN_MILLISECONDS) {
    const minutes = timeDifference / (60 * 1000);
    const modifiedMinutes = addZeroBeforeNumber(Math.round(minutes));

    return `${modifiedMinutes}M`;
  } else if (timeDifference <= ONE_DAY_IN_MILLISECONDS) {
    const hours = timeDifference / (60 * 60 * 1000);
    const leftMinutes = (hours - Math.floor(hours)) * 60;

    const modifiedHours = addZeroBeforeNumber(Math.floor(hours));
    const modifiedMinutes = addZeroBeforeNumber(Math.round(leftMinutes));

    return `${modifiedHours}H ${modifiedMinutes}M`;
  } else {
    const days = timeDifference / (24 * 60 * 60 * 1000);
    const leftHours = timeDifference / (60 * 60 * 1000) - Math.floor(days) * 24;
    const leftMinutes = (leftHours - Math.floor(leftHours)) * 60;

    const modifiedDays = addZeroBeforeNumber(Math.floor(days));
    const modifiedHours = addZeroBeforeNumber(Math.floor(leftHours));
    const modifiedMinutes = addZeroBeforeNumber(Math.round(leftMinutes));

    return `${modifiedDays}D ${modifiedHours}H ${modifiedMinutes}M`;
  }
};

const createTripEventOffers = (tripEvent, tripOffers) => {
  if (tripEvent.offers.length === 0) {
    return ('');
  }

  const tripOffer = tripOffers.find((element) => element.type === tripEvent.type).offers;

  const tripOffersItems = tripEvent.offers.map((offerId) => {
    const offer = tripOffer[offerId-1];

    return (`
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `);
  });

  return (`
    <h4 class="visually-hidden">Offers:</h4>

    <ul class="event__selected-offers">
      ${tripOffersItems.join('')}
    </ul>
  `);
};

const createTripEventTemplate = (tripEvent, tripOffers) => {
  const startDate = tripEvent.date_from;
  const yearMonthDayFromStart = startDate.slice(0, 10);
  const startFullDate = startDate.slice(0, 16);
  const startDateHoursMinutes = startDate.slice(11, 16);

  const endDate = tripEvent.date_to;
  const endFullDate = endDate.slice(0, 16);
  const endDateHoursMinutes = endDate.slice(11, 16);

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${yearMonthDayFromStart}">${createHumanizedMonthDayDate(startDate)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripEvent.type} ${tripEvent.destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startFullDate}">${startDateHoursMinutes}</time>
            —
            <time class="event__end-time" datetime="${endFullDate}">${endDateHoursMinutes}</time>
          </p>
          <p class="event__duration">${createTimeDifference(startDate, endDate)}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${tripEvent.base_price}</span>
        </p>
        ${createTripEventOffers(tripEvent, tripOffers)}
        <button class="event__favorite-btn ${tripEvent.is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};

export default class TripEventView extends AbstractView {
  #tripEvent = null;
  #tripOffers = null;

  constructor(tripEvent, tripOffers) {
    super();
    this.#tripEvent = tripEvent;
    this.#tripOffers = tripOffers;
  }

  get template() {
    return createTripEventTemplate(this.#tripEvent, this.#tripOffers);
  }
}
