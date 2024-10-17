import AbstractView from '../framework/view/abstract-view.js';

const createTripEventSortsTemplate = () => (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="">
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
`);

export default class TripEventSortsView extends AbstractView {

  setSortByDayClickHandler = (callback) => {
    this._callback.sortByDayClick = callback;
    this.element.querySelector('#sort-day').addEventListener('click', this.#sortByDayClickHandler);
  };

  #sortByDayClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortByDayClick();
  };

  setSortByTimeClickHandler = (callback) => {
    this._callback.sortByTimeClick = callback;
    this.element.querySelector('#sort-time').addEventListener('click', this.#sortByTimeClickHandler);
  };

  #sortByTimeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortByTimeClick();
  };

  setSortByPriceClickHandler = (callback) => {
    this._callback.sortByPriceClick = callback;
    this.element.querySelector('#sort-price').addEventListener('click', this.#sortByPriceClickHandler);
  };

  #sortByPriceClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortByPriceClick();
  };

  get template() {
    return createTripEventSortsTemplate();
  }
}
