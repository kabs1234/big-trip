import AbstractView from '../framework/view/abstract-view.js';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { createHumanizedMonthDayDate } from '../utils/utils.js';

dayjs.extend(duration);

const createTimeDifference = (startDate, endDate) => {
  const ONE_HOUR_IN_MILLISECONDS = 3.6e6;
  const ONE_DAY_IN_MILLISECONDS = 8.64e7;

  const timeDifference = dayjs(endDate).diff(dayjs(startDate));
  const timeDuration = dayjs.duration(timeDifference);
  const minutes = timeDuration.format('mm');
  const hours = timeDuration.format('HH');
  const days = timeDuration.format('DD');

  if (timeDifference <= ONE_HOUR_IN_MILLISECONDS) {
    return `${minutes}M`;
  } else if (timeDifference <= ONE_DAY_IN_MILLISECONDS) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${days}D ${hours}H ${minutes}M`;
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
  const startDate = dayjs(tripEvent.date_from);
  const eventStartDate = `${startDate.format('YYYY-MM-DD')}`;
  const isoStartDate = `${startDate.format('YYYY-MM-DDTHH:mm')}`;
  const hoursAndMinutesStartDate = `${startDate.format('HH:mm')}`;

  const endDate = dayjs(tripEvent.date_to);
  const isoEndDate = `${endDate.format('YYYY-MM-DDTHH:mm')}`;
  const hoursAndMinutesEndDate = `${endDate.format('HH:mm')}`;

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${eventStartDate}">${createHumanizedMonthDayDate(startDate)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripEvent.type} ${tripEvent.destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${isoStartDate}">${hoursAndMinutesStartDate}</time>
            —
            <time class="event__end-time" datetime="${isoEndDate}">${hoursAndMinutesEndDate}</time>
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

  setEditEventClickHandler = (callback) => {
    this._callback.editEventClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editEventHandler);
  };

  #editEventHandler = (evt) => {
    evt.preventDefault();
    this._callback.editEventClick();
  };

  setFavoriteButtonClickHandler = (callback) => {
    this._callback.favoriteButtonClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteButtonClickHandler);
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteButtonClick();
  };

  get template() {
    return createTripEventTemplate(this.#tripEvent, this.#tripOffers);
  }
}
