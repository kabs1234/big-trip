import { render, RenderPosition } from '../framework/render.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventsContainerView from '../view/trip-events-container-view.js';
import TripNewEventView from '../view/trip-new-event-view.js';
import TripEventPresenter from './trip-event-presenter.js';

const SORT_TYPE = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

export default class TripEventsPresenter {
  #tripEventSortsView = new TripEventSortsView();
  #tripEventsContainerView = new TripEventsContainerView();
  #tripEventsMap = new Map();
  #container = null;
  #tripEventsModel = null;
  #tripOffersModel = null;
  #tripDestinationsModel = null;
  #sortType = SORT_TYPE.DAY;

  constructor(tripEventsModel, tripOffersModel, tripDestinationsModel, container) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripOffersModel = tripOffersModel;
    this.#tripDestinationsModel = tripDestinationsModel;
    this.#container = container;
  }

  get tripEvents() {
    switch (this.#sortType) {
      case SORT_TYPE.TIME:
        this.#sortType = SORT_TYPE.TIME;
        return this.sortEventsByTime([...this.#tripEventsModel.tripEvents]);
      case SORT_TYPE.PRICE:
        this.#sortType = SORT_TYPE.PRICE;
        return this.sortEventsByPrice([...this.#tripEventsModel.tripEvents]);
    }

    return [...this.#tripEventsModel.tripEvents];
  }

  get tripOffers() {
    return this.#tripOffersModel.tripOffers;
  }

  get tripDestinations() {
    return this.#tripDestinationsModel.tripDestinations;
  }

  #renderTripEvents = (tripEvents) => {
    render(this.#tripEventsContainerView, this.#container);

    tripEvents.map((tripEvent) => {
      const tripEventPresenter = new TripEventPresenter(this.#tripEventsContainerView, this.handleTripEventChange, this.handleTripEventModeChange);
      this.#tripEventsMap.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.initalize(tripEvent, this.tripOffers, this.tripDestinations);
    });
  };

  sortEventsByTime = (tripEvents) => {
    const sortedTripEventsByTime = tripEvents.sort((a, b) => {
      const durationA = new Date(a.date_to) - new Date(a.date_from);
      const durationB = new Date(b.date_to) - new Date(b.date_from);

      return durationB - durationA;
    });

    return sortedTripEventsByTime;
  };

  sortEventsByPrice = (tripEvents) => {
    const sortedTripEventsByPrice = tripEvents.sort((a, b) => b.base_price - a.base_price);

    return sortedTripEventsByPrice;
  };

  sortEventsByDay = (tripEvents) => {
    const sortedTripEventsByDay = tripEvents.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));

    return sortedTripEventsByDay;
  };

  #setSortingsHandlers = () => {
    this.#tripEventSortsView.setSortByDayClickHandler(() => {
      this.renderSortedTripEvents(SORT_TYPE.DAY);
    });

    this.#tripEventSortsView.setSortByTimeClickHandler(() => {
      this.renderSortedTripEvents(SORT_TYPE.TIME);
    });

    this.#tripEventSortsView.setSortByPriceClickHandler(() => {
      this.renderSortedTripEvents(SORT_TYPE.PRICE);
    });
  };

  renderSortedTripEvents = (sortType) => {
    if (sortType === this.#sortType) {
      return;
    }

    this.#sortType = sortType;
    this.clearTripEventsList();
    this.#renderTripEvents(this.tripEvents);
  };

  clearTripEventsList = () => {
    this.#tripEventsMap.forEach((presenter) => presenter.destroy());
    this.#tripEventsMap.clear();
  };

  handleTripEventChange = (updatedTripEvent) => {
    this.#tripEventsModel.updateTripEvents(updatedTripEvent);
    this.#tripEventsMap.get(updatedTripEvent.id).initalize(updatedTripEvent, this.tripOffers, this.tripDestinations);
  };

  handleTripEventModeChange = () => {
    this.#tripEventsMap.forEach((presenter) => presenter.resetView());
  };

  renderTripNewEvent = () => {
    const newTripEvent = new TripNewEventView();

    render(newTripEvent, this.#tripEventsContainerView.element, RenderPosition.AFTERBEGIN);
  };

  initalize = () => {
    render(this.#tripEventSortsView, this.#container);
    this.#setSortingsHandlers();
    this.#renderTripEvents(this.tripEvents);
  };
}
