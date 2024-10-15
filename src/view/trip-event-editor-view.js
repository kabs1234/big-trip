import AbstractView from '../framework/view/abstract-view.js';
import { addZeroBeforeNumber } from '../utils/utils.js';

const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createTripEventTypeInput = (type, tripEventType) => (`
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${type === tripEventType ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${capitalizeString(type)}</label>
  </div>
`);

const createTripEventTypeCheckbox = (tripEvent) => {
  const tripEventType = tripEvent.type;
  const tripEventTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const tripEventsTypesInputs = tripEventTypes.map((element) => createTripEventTypeInput(element, tripEventType));
  const tripEventsTypesInputsString = tripEventsTypesInputs.join('');

  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${tripEvent.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${tripEventsTypesInputsString}
        </fieldset>
      </div>
    </div>
  `);
};

const createTripEventDestinationList = (tripEvent) => {
  const capitalizedTripEventType = capitalizeString(tripEvent.type);

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">${capitalizedTripEventType}</label>
      <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripEvent.destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>
  `);
};

const createTripEventOffers = (tripEvent, tripOffers) => {
  if (tripEvent.offers.length === 0) {
    return '';
  }

  const tripOffer = tripOffers.find((element) => element.type === tripEvent.type).offers;

  const tripOffersArray = tripOffer.map((offer) => {
    const SplittedOfferTitle = offer.title.split(' ');
    const wordsWithoutPunctuation = SplittedOfferTitle.map((word) => {
      const punctuationless = word.replace(/[.,'/#!$%^&*;:{}=_`~]/g,'');
      const finalString = punctuationless.replace(/\s{2,}/g,' ');
      return finalString.toLowerCase();
    });

    const isOfferChecked = tripEvent.offers.includes(offer.id) ? 'checked' : '';

    const joinedWordsWithoutPunctuation = wordsWithoutPunctuation.join('-');

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-${joinedWordsWithoutPunctuation}-1" type="checkbox" name="event-${joinedWordsWithoutPunctuation}" ${isOfferChecked}>
        <label class="event__offer-label" for="event-${joinedWordsWithoutPunctuation}-1">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  });

  const tripOffersString = tripOffersArray.join('');

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${tripOffersString}
      </div>
    </section>
  `);
};


const createDestinationPictures = (destinationPictures) => {
  if (!Array.isArray(destinationPictures)) {
    return '';
  }

  const destinationPicturesList = destinationPictures.map((element) => (`<img class="event__photo" src="${element.src}" alt="${element.description}">`));
  const destinationPicturesString = destinationPicturesList.join('');

  return (`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destinationPicturesString}
      </div>
    </div>
  `);
};

const createDestinationContainer = (tripEvent) => {
  if (!tripEvent.destination.description && !tripEvent.destination.pictures) {
    return '';
  }

  const tripDestination = tripEvent.destination;
  const destinationDescription = tripDestination.description ? tripDestination.description : '' ;
  const destinationPictures = tripDestination.pictures;

  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>
      ${createDestinationPictures(destinationPictures)}
    </section>
  `);
};

const getFullDate = (date) => {
  const dayFromDate = addZeroBeforeNumber(date.getDate());
  const monthFromDate = addZeroBeforeNumber(date.getMonth());
  const yearFromDate = addZeroBeforeNumber(date.getFullYear());
  const hourFromDate = addZeroBeforeNumber(date.getHours());
  const minuteFromDate = addZeroBeforeNumber(date.getMinutes());

  return {
    day: dayFromDate,
    month: monthFromDate,
    year: yearFromDate,
    hour: hourFromDate,
    minute: minuteFromDate,
  };
};

const createTripEventTime = (tripEvent) => {
  const startDate = new Date(tripEvent.date_from);
  const fullStartDate = getFullDate(startDate);
  const fullFormattedStartDate = `${fullStartDate.day}/${fullStartDate.month}/${fullStartDate.year} ${fullStartDate.hour}:${fullStartDate.minute}`;


  const endDate = new Date(tripEvent.date_to);
  const fullEndDate = getFullDate(endDate);
  const fullFormattedEndDate = `${fullEndDate.day}/${fullEndDate.month}/${fullEndDate.year} ${fullEndDate.hour}:${fullEndDate.minute}`;

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${fullFormattedStartDate}'>
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${fullFormattedEndDate}'>
    </div>
  `);
};

const createTripEventEditorTemplate = (tripEvent, tripOffers) => (`
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">

      ${createTripEventTypeCheckbox(tripEvent)}

      ${createTripEventDestinationList(tripEvent)}

      ${createTripEventTime(tripEvent)}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripEvent.base_price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      ${createTripEventOffers(tripEvent, tripOffers)}

      ${createDestinationContainer(tripEvent)}
    </section>
  </form>
`);

export default class TripEventEditorView extends AbstractView {
  #tripEvent = null;
  #tripOffers = null;

  constructor(tripEvent, tripOffers) {
    super();
    this.#tripEvent = tripEvent;
    this.#tripOffers = tripOffers;
  }

  get template() {
    return createTripEventEditorTemplate(this.#tripEvent, this.#tripOffers);
  }
}
