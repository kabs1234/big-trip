import { render} from '../framework/render.js';
import TripFiltersView from '../view/trip-filters-view.js';

export default class TripFiltersPresenter {
  #container = null;
  #tripFiltersView = null;
  #tripEventsModel = null;
  #tripOffersModel = null;

  constructor(tripEventsModel, tripOffersModel, container) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripOffersModel = tripOffersModel;
    this.#container = container;
  }

  get tripEvents() {
    return this.#tripEventsModel.tripEvents;
  }

  get tripOffers() {
    return this.#tripOffersModel.tripOffers;
  }

  #renderTripFilters = () => {
    this.#tripFiltersView = new TripFiltersView(this.tripEvents, this.tripOffers);
    render(this.#tripFiltersView , this.#container);
  };

  #setEventListeners = () => {
    this.#tripFiltersView.setFilterByAllClickHandler(() => {
      console.log('hi');
    });

    this.#tripFiltersView.setFilterByPastClickHandler(() => {
      console.log('hi');
    });

    this.#tripFiltersView.setFilterByFutureClickHandler(() => {
      console.log('hi');
    });
  };

  initalize() {
    this.#renderTripFilters();
    this.#setEventListeners();
  }
}
