import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class TripEventCreator extends AbstractStatefulView {
  #creatingView = null;
  #tripDestinations = null;

  constructor(creatingView, tripDestinations) {
    super();
    this.#creatingView = creatingView;
    this.#tripDestinations = tripDestinations;
  }

  static parseTripEventToState = (tripEvent) => ({
    ...tripEvent,
    type: tripEvent.type,
    destination: {
      ...tripEvent.destination,
      name: tripEvent.destination.name
    },
    isSaving: false,
    isDeleting: false,
    isDisabled: false
  });

  static parseStateToTripEvent = (state) => {
    const tripEvent = {...state};

    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;
    delete tripEvent.isDisabled;

    return tripEvent;
  };

  setInnerHandlers = () => {
    this.#setEventTypeHandler();
    this.#setEventDestinationHandler();
    this.#setEventTimeHandlers();
    this.#setEventOffersHandler();
    this.#setEventPriceHandler();
  };

  #setEventPriceHandler = () => {
    const tripEventPriceInput = this.element.querySelector('.event__input--price');

    tripEventPriceInput.addEventListener('change', this.eventPriceHandler);
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

    tripEventStartTimeInput.addEventListener('click', () => {
      const flatpickrStartTimeInstance = flatpickr(tripEventStartTimeInput, {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        maxDate: tripEventEndTimeInput.value,
        onChange: (selectedDates) => {
          this.eventStartDateHandler(selectedDates[0].toISOString());
        },
        onClose: () => {
          flatpickrStartTimeInstance.destroy();
        }
      });

      flatpickrStartTimeInstance.open();
    });

    tripEventEndTimeInput.addEventListener('click', () => {
      const flatpickrEndTimeInstance = flatpickr(tripEventEndTimeInput, {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: tripEventStartTimeInput.value,
        onChange: (selectedDates) => {
          this.eventEndDateHandler(selectedDates[0].toISOString());
        },
        onClose: () => {
          flatpickrEndTimeInstance.destroy();
        }
      });

      flatpickrEndTimeInstance.open();
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

    this._callback.formSubmit(this.#creatingView.parseStateToTripEvent(this._state));
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.deleteButtonClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonClickHandler);
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteButtonClick();
  };

  eventDestinationHandler = (evt) => {
    evt.preventDefault();

    const destinationName = evt.target.value;
    const destinationInfo = this.#tripDestinations.find((element) => element.name === destinationName);

    this.updateElement({
      destination: {
        ...destinationInfo
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
      'date_from': str
    });
  };

  eventEndDateHandler = (str) => {
    this.updateElement({
      'date_to': str
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
      'base_price': +evt.target.value
    });
  };

  reset = (tripEvent) => {
    this.updateElement(this.#creatingView.parseTripEventToState(tripEvent));
  };

}
