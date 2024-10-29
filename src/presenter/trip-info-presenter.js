import { TRIPS_FILTER } from '../constants.js';
import { remove, render, replace } from '../framework/render.js';
import { filterEventsByFuture, filterEventsByPast } from '../utils/utils.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #container = null;
  #tripInfoView = null;
  #tripEventsModel = null;
  #tripOffersModel = null;
  #tripFilterModel = null;

  constructor(tripEventsModel, tripOffersModel, tripFilterModel, container) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripOffersModel = tripOffersModel;
    this.#tripFilterModel = tripFilterModel;
    this.#container = container;

    this.#tripEventsModel.addObserver(this.#renderTripInfo);
    this.#tripFilterModel.addObserver(this.#renderTripInfo);
  }

  get tripFilter() {
    return this.#tripFilterModel.tripFilter;
  }

  get tripEvents() {
    const tripEventsCopy = [...this.#tripEventsModel.tripEvents];

    switch (this.tripFilter) {
      case TRIPS_FILTER.FUTURE:
        return filterEventsByFuture(tripEventsCopy);
      case TRIPS_FILTER.PAST:
        return filterEventsByPast(tripEventsCopy);
    }

    return this.#tripEventsModel.tripEvents;
  }

  get tripOffers() {
    return this.#tripOffersModel.tripOffers;
  }

  #renderTripInfo = () => {
    if (this.tripEvents.length === 0) {
      // remove(this.#tripInfoView);
      // this.#tripInfoView = null;
      return;
    }

    const previousTripInfoView = this.#tripInfoView;

    this.#tripInfoView = new TripInfoView(this.tripEvents, this.tripOffers);

    if (previousTripInfoView === null) {
      render(this.#tripInfoView, this.#container);
      return;
    }

    replace(this.#tripInfoView, previousTripInfoView);
    remove(previousTripInfoView);
  };

  initalize() {
    this.#renderTripInfo();
  }
}
