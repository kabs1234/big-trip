import { TRIPS_FILTER } from '../constants.js';
import AbstractView from '../framework/view/abstract-view.js';

const createTripFiltersTemplate = (activeFilter) => (`
  <div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${activeFilter === TRIPS_FILTER.EVERYTHING ? 'checked' : ''}>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${activeFilter === TRIPS_FILTER.FUTURE ? 'checked' : ''}>
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${activeFilter === TRIPS_FILTER.PAST ? 'checked' : ''}>
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>
`);

export default class TripFiltersView extends AbstractView {
  #activeFilter = null;

  constructor(activeFilter) {
    super();
    this.#activeFilter = activeFilter;
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

  get template() {
    return createTripFiltersTemplate(this.#activeFilter);
  }
}
