import * as dayjs from 'dayjs';

const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createTripDestinationsList = (tripEvent, tripDestinations) => {
  const tripEventDestinationName = tripEvent.destination.name;

  const tripDestinationsOptionsList = tripDestinations.map((destination) => {
    if (destination.name === tripEventDestinationName) {
      return `<option value="${destination.name}" selected>${destination.name}</option>`;
    } else {
      return `<option value="${destination.name}">${destination.name}</option>`;
    }
  });

  const tripDestinationsOptionsString = tripDestinationsOptionsList.join('');

  return (`
    <select id="event-destination-1" required>
      ${!tripEventDestinationName ? '<option value="" selected disabled>Pick a destination</option>' : ''}
      ${tripDestinationsOptionsString}
    </select>
  `);
};

export const createTripEventDestinationList = (tripEvent, tripDestinations) => {
  const capitalizedTripEventType = capitalizeString(tripEvent.type);

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">${capitalizedTripEventType}</label>
      ${createTripDestinationsList(tripEvent, tripDestinations)}
    </div>
  `);
};

const createTripEventTypeInput = (type, tripEventType) => (`
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${type === tripEventType ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${capitalizeString(type)}</label>
  </div>
`);

export const createTripEventTypeCheckbox = (tripEvent) => {
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

export const createTripEventTime = (tripEvent) => {
  const startDate = tripEvent.date_from ? dayjs(tripEvent.date_from) : '';
  const fullFormattedStartDate = startDate ? `${startDate.format('DD/MM/YY HH:mm')}` : '';

  const endDate = tripEvent.date_to ? dayjs(tripEvent.date_to) : '';
  const fullFormattedEndDate = endDate ? `${endDate.format('DD/MM/YY HH:mm')}` : '';

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden event__label event__label--start-time" for="event-start-time-1">From</label>
      <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${fullFormattedStartDate}' required>
      —
      <label class="visually-hidden event__label event__label--end-time" for="event-end-time-1">To</label>
      <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${fullFormattedEndDate}' required>
    </div>
  `);
};

export const createTripEventOffers = (tripEvent, tripOffers) => {
  if (tripOffers.length === 0) {
    return '';
  }

  const tripOffer = tripOffers.find((element) => element.type === tripEvent.type).offers;

  if (tripOffer.length === 0) {
    return '';
  }

  const tripOffersArray = tripOffer.map((offer, offerIndex) => {
    const SplittedOfferTitle = offer.title.split(' ');
    const wordsWithoutPunctuation = SplittedOfferTitle.map((word) => {
      const punctuationless = word.replace(/[.,'/#!$%^&*;:{}=_`~]/g,'');
      const finalString = punctuationless.replace(/\s{2,}/g,' ');
      return finalString.toLowerCase();
    });

    const isOfferChecked = tripEvent.offers.includes(offerIndex + 1) ? 'checked' : '';

    const joinedWordsWithoutPunctuation = wordsWithoutPunctuation.join('-');

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-${joinedWordsWithoutPunctuation}-1" type="checkbox" name="event-${joinedWordsWithoutPunctuation}" ${isOfferChecked} data-offer-id='${offerIndex + 1}'>
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

export const createDestinationContainer = (tripEvent, tripDestinations) => {
  const tripDestination = tripDestinations.find((destination) => destination.name === tripEvent.destination.name);

  if (!tripDestination || (!tripDestination.description && !tripDestination.pictures)) {
    return '';
  }

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
