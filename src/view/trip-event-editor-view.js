import * as dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

const createTripDestinationsList = (tripEvent, tripDestinations) => {
  const tripDestinationsOptionsList = tripDestinations.map((destination) => {
    if (destination.name === tripEvent.destination.name) {
      return `<option value="${destination.name}" selected>${destination.name}</option>`;
    } else {
      return `<option value="${destination.name}">${destination.name}</option>`;
    }
  });

  const tripDestinationsOptionsString = tripDestinationsOptionsList.join('');

  return (`
    <select id="event-destination-1">
      ${tripDestinationsOptionsString}
    </select>
  `);
};

const createTripEventDestinationList = (tripEvent, tripDestinations) => {
  const capitalizedTripEventType = capitalizeString(tripEvent.type);

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">${capitalizedTripEventType}</label>
      ${createTripDestinationsList(tripEvent, tripDestinations)}
    </div>
  `);
};

const createTripEventOffers = (tripEvent, tripOffers) => {
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

const createDestinationContainer = (tripEvent, tripDestinations) => {
  const tripDestination = tripDestinations.find((destination) => destination.name === tripEvent.destination.name);

  if (!tripDestination.description && !tripDestination.pictures) {
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

const createTripEventTime = (tripEvent) => {
  const startDate = dayjs(tripEvent.date_from);
  const fullFormattedStartDate = `${startDate.format('DD/MM/YY HH:mm')}`;

  const endDate = dayjs(tripEvent.date_to);
  const fullFormattedEndDate = `${endDate.format('DD/MM/YY HH:mm')}`;

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${fullFormattedStartDate}'>
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${fullFormattedEndDate}'>
    </div>
  `);
};


const createTripEventEditorTemplate = (tripEvent, tripOffers, tripDestinations) => (`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">

        ${createTripEventTypeCheckbox(tripEvent)}

        ${createTripEventDestinationList(tripEvent, tripDestinations)}

        ${createTripEventTime(tripEvent)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripEvent.base_price}">
        </div>

        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${createTripEventOffers(tripEvent, tripOffers)}

        ${createDestinationContainer(tripEvent, tripDestinations)}
      </section>
    </form>
  </li>
`);

export default class TripEventEditorView extends AbstractStatefulView  {
  #tripEvent = null;
  #tripOffers = null;
  #tripDestinations = null;

  constructor(tripEvent, tripOffers, tripDestinations) {
    super();
    this._state = TripEventEditorView.parseTripEventToState(tripEvent);
    this.#tripOffers = tripOffers;
    this.#tripDestinations = tripDestinations;

    this.#setInnerHandlers();
  }

  static parseTripEventToState = (tripEvent) => ({
    ...tripEvent,
    type: tripEvent.type,
    destination: {
      ...tripEvent.destination,
      name: tripEvent.destination.name
    }
  });

  static parseStateToTripEvent = (state) => {
    const tripEvent = {...state};

    return tripEvent;
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteButtonClickHandler(this._callback.deleteButtonClick);
    this.setCloseEditorClickHandler(this._callback.closeEditor);
  };

  #setInnerHandlers = () => {
    this.#setEventTypeHandler();
    this.#setEventDestinationHandler();
    this.#setEventTimeHandlers();
    this.#setEventOffersHandler();
    this.#setEventPriceHandler();
  };

  #setEventPriceHandler = () => {
    const tripEventPriceInput = this.element.querySelector('.event__input--price');

    tripEventPriceInput.addEventListener('focusout', this.eventPriceHandler);
  };

  #setEventOffersHandler = () => {
    const tripEventOffers = this.element.querySelectorAll('.event__offer-checkbox');

    if (!tripEventOffers) {
      return;
    }

    tripEventOffers.forEach((eventOffer) => eventOffer.addEventListener('click', this.eventOfferHandler));
  };

  #setEventTimeHandlers = () => {
    const tripEventStartTimeInput = this.element.querySelector('#event-start-time-1');
    const tripEventEndTimeInput = this.element.querySelector('#event-end-time-1');

    flatpickr(tripEventStartTimeInput, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      time_24hr: true,
      onClose: (selectedDates) => this.eventStartDateHandler(selectedDates[0].toISOString())
      ,
    });

    flatpickr(tripEventEndTimeInput, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      time_24hr: true,
      minDate: tripEventStartTimeInput.value,
      onClose: (selectedDates) => this.eventEndDateHandler(selectedDates[0].toISOString())
      ,
    });
  };

  #setEventTypeHandler = () => {
    const tripEventsTypeInputs = this.element.querySelectorAll('.event__type-input');

    tripEventsTypeInputs.forEach((tripEventsTypeInput) => tripEventsTypeInput.addEventListener('click', this.eventTypeHandler));
  };

  #setEventDestinationHandler = () => {
    const tripEventDestinationInput = this.element.querySelector('#event-destination-1');

    tripEventDestinationInput.addEventListener('change', this.eventDestinationHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    console.log(TripEventEditorView.parseStateToTripEvent(this._state));
    this._callback.formSubmit(TripEventEditorView.parseStateToTripEvent(this._state));
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.deleteButtonClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonClickHandler);
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteButtonClick();
  };

  setCloseEditorClickHandler = (callback) => {
    this._callback.closeEditor = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditorHandler);
  };

  #closeEditorHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeEditor();
  };

  eventDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: {
        name: evt.target.value
      }
    });
  };

  eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  eventStartDateHandler = (str) => {
    this.updateElement({
      date_from: str
    });
  };

  eventEndDateHandler = (str) => {
    this.updateElement({
      date_to: str
    });
  };

  eventOfferHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.checked) {
      evt.target.checked = false;

      this.updateElement({
        offers: [...this._state.offers, +evt.target.dataset.offerId]
      });
    } else {
      const tripOffers = [...this._state.offers];
      const deletingOfferIndex = tripOffers.indexOf(+evt.target.dataset.offerId);
      tripOffers.splice(deletingOfferIndex, 1);

      evt.target.checked = true;
      this.updateElement({
        offers: tripOffers
      });
    }
  };

  eventPriceHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      base_price: +evt.target.value
    });
  };

  reset = (tripEvent) => {
    this.updateElement(TripEventEditorView.parseTripEventToState(tripEvent));
  };

  get template() {
    return createTripEventEditorTemplate(this._state, this.#tripOffers, this.#tripDestinations);
  }
}
