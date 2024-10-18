import AbstractView from '../framework/view/abstract-view.js';
import { createTripInfo } from './trip-info-view.js';

const createTripFilters = () => (`
  <div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>
`);

const createTripHeaderTemplate = (tripEvents, tripOffers) => (`
  <div class="trip-main">
    ${createTripInfo(tripEvents, tripOffers)}

    ${createTripFilters()}

    <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>
  </div>
`);

export default class TripHeaderView extends AbstractView {
  #tripEvents = null;
  #tripOffers = null;

  constructor(tripEvents, tripOffers) {
    super();
    this.#tripEvents = tripEvents;
    this.#tripOffers = tripOffers;
  }

  setFilterByAllClickHandler = (callback) => {
    this._callback.filterByAllClick = callback;
    this.element.querySelector('#filter-everything').addEventListener('click', this.#filterByAllClickHandler);
  };

  #filterByAllClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterByAllClick();
  };

  setFilterByPastClickHandler = (callback) => {
    this._callback.filterByPastClick = callback;
    this.element.querySelector('#filter-past').addEventListener('click', this.#filterByPastClickHandler);
  };

  #filterByPastClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterByPastClick();
  };

  setFilterByFutureClickHandler = (callback) => {
    this._callback.filterByFutureClick = callback;
    this.element.querySelector('#filter-future').addEventListener('click', this.#filterByFutureClickHandler);
  };

  #filterByFutureClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterByFutureClick();
  };

  setAddEventButtonClickHandler = (callback) => {
    this._callback.addEventButtonClick = callback;
    this.element.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#addEventButtonClickHandler);
  };

  #addEventButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addEventButtonClick();
  };

  get template() {
    return createTripHeaderTemplate(this.#tripEvents, this.#tripOffers);
  }
}
