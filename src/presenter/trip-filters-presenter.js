import { TRIPS_FILTER, UPDATE_TYPE } from '../constants.js';
import { remove, render, replace} from '../framework/render.js';
import TripFiltersView from '../view/trip-filters-view.js';


export default class TripFiltersPresenter {
  #container = null;
  #tripFiltersView = null;
  #tripEventsModel = null;
  #tripFiltersModel = null;

  constructor(tripEventsModel, tripFiltersModel, container) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripFiltersModel = tripFiltersModel;
    this.#container = container;

    this.#tripEventsModel.addObserver(this.#renderTripFilters);
    this.#tripFiltersModel.addObserver(this.#renderTripFilters);
  }

  get tripFilter() {
    return this.#tripFiltersModel.tripFilter;
  }

  #renderTripFilters = () => {
    const previousTripFilterView = this.#tripFiltersView;

    this.#tripFiltersView = new TripFiltersView(this.tripFilter);
    this.#setEventListeners();

    if (previousTripFilterView === null) {
      render(this.#tripFiltersView, this.#container);
      return;
    }

    replace(this.#tripFiltersView, previousTripFilterView);
    remove(previousTripFilterView);
  };

  #setEventListeners = () => {
    this.#tripFiltersView.setFilterByAllClickHandler(() => {
      this.handleFilterChange(TRIPS_FILTER.EVERYTHING);
    });

    this.#tripFiltersView.setFilterByPastClickHandler(() => {
      this.handleFilterChange(TRIPS_FILTER.PAST);
    });

    this.#tripFiltersView.setFilterByFutureClickHandler(() => {
      this.handleFilterChange(TRIPS_FILTER.FUTURE);
    });
  };

  handleFilterChange = (filterType) => {
    if (filterType === this.tripFilter) {
      return;
    }

    switch (this.tripFilter) {
      case TRIPS_FILTER.FUTURE:
        this.#tripFiltersModel.setTripFilter(UPDATE_TYPE.MAJOR, filterType);
        break;
      case TRIPS_FILTER.PAST:
        this.#tripFiltersModel.setTripFilter(UPDATE_TYPE.MAJOR, filterType);
        break;
      default:
        this.#tripFiltersModel.setTripFilter(UPDATE_TYPE.MAJOR, filterType);
    }
  };

  initalize() {
    this.#renderTripFilters();
    this.#setEventListeners();
  }
}
