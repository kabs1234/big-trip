import AbstractView from '../framework/view/abstract-view.js';

const createTripEventTypes = () => (`
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>
  </div>
`);

const createTripOffersInfo = () => (`
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-infotainment-system-1" type="checkbox" name="event-infotainment-system">
        <label class="event__offer-label" for="event-infotainment-system-1">
          <span class="event__offer-title">Infotainment system</span>
          +€&nbsp;
          <span class="event__offer-price">50</span>
        </label>
      </div>

      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-order-meal-1" type="checkbox" name="event-order-meal">
        <label class="event__offer-label" for="event-order-meal-1">
          <span class="event__offer-title">Order meal</span>
          +€&nbsp;
          <span class="event__offer-price">100</span>
        </label>
      </div>

      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-choose-seats-1" type="checkbox" name="event-choose-seats">
        <label class="event__offer-label" for="event-choose-seats-1">
          <span class="event__offer-title">Choose seats</span>
          +€&nbsp;
          <span class="event__offer-price">190</span>
        </label>
      </div>
    </div>
  </section>
`);

const createTripDestinationInfo = () => (`
  <section class="event__section  event__section--destination"></p>
    <div class="event__photos-container">
      <div class="event__photos-tape"></div>
    </div>
  </section>
`);

const createTripNewEventTemplate = () => (`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${createTripEventTypes()}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">Bus</label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1">
          <datalist id="destination-list-1"></datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        ${createTripOffersInfo()}
        ${createTripDestinationInfo()}
      </section>
    </form>
  </li>
`);

export default class TripNewEventView extends AbstractView {
  setSaveButtonClickHandler = (callback) => {
    this._callback.saveButtonClick = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveButtonClickHandler);
  };

  #saveButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveButtonClick();
  };

  setCancelButtonClickHandler = (callback) => {
    this._callback.cancelButtonClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelButtonClickHandler);
  };

  #cancelButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelButtonClick();
  };

  get template() {
    return createTripNewEventTemplate();
  }
}
