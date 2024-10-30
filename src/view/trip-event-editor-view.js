import TripEventCreator from '../utils/trip-event-creator.js';
import { createDestinationContainer, createTripEventDestinationList, createTripEventOffers, createTripEventTime, createTripEventTypeCheckbox } from '../utils/trip-creator-views.js';


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
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${tripEvent.base_price}">
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

export default class TripEventEditorView extends TripEventCreator {
  #tripOffers = null;
  #tripDestinations = null;

  constructor(tripEvent, tripOffers, tripDestinations) {
    super(TripEventEditorView, tripDestinations);
    this._state = TripEventEditorView.parseTripEventToState(tripEvent);
    this.#tripOffers = tripOffers;
    this.#tripDestinations = tripDestinations;

    this.setInnerHandlers();
  }

  setCloseEditorClickHandler = (callback) => {
    this._callback.closeEditor = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditorHandler);
  };

  #closeEditorHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeEditor();
  };

  reset = (tripEvent) => {
    this.updateElement(TripEventEditorView.parseTripEventToState(tripEvent));
  };

  get template() {
    return createTripEventEditorTemplate(this._state, this.#tripOffers, this.#tripDestinations);
  }
}
