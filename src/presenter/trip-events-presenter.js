import { render, RenderPosition } from '../framework/render.js';
import { updateTripEvent } from '../utils/utils.js';
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
  #tripEventsData = null;
  #tripOffersData = null;
  #tripDestinationsData = null;
  #tripEventsDataCopy = null;
  #sortType = SORT_TYPE.DAY;

  constructor(tripEventsData, tripOffersData, tripDestinationsData, container) {
    this.#tripEventsData = [...tripEventsData];
    this.#tripOffersData = tripOffersData;
    this.#tripDestinationsData = tripDestinationsData;
    this.#container = container;
  }

  #renderTripEvents = (tripEvents) => {
    render(this.#tripEventsContainerView, this.#container);

    tripEvents.map((tripEvent) => {
      const tripEventPresenter = new TripEventPresenter(this.#tripEventsContainerView, this.handleTripEventChange, this.handleTripEventModeChange);
      this.#tripEventsMap.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.initalize(tripEvent, this.#tripOffersData, this.#tripDestinationsData);
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

    this.#tripEventsDataCopy = [...this.#tripEventsData];

    switch (sortType) {
      case SORT_TYPE.DAY:
        this.sortEventsByDay(this.#tripEventsDataCopy);
        this.#sortType = SORT_TYPE.DAY;
        break;
      case SORT_TYPE.TIME:
        this.sortEventsByTime(this.#tripEventsDataCopy);
        this.#sortType = SORT_TYPE.TIME;
        break;
      case SORT_TYPE.PRICE:
        this.sortEventsByPrice(this.#tripEventsDataCopy);
        this.#sortType = SORT_TYPE.PRICE;
        break;
    }

    this.clearTripEventsList();
    this.#renderTripEvents(this.#tripEventsDataCopy);
  };

  clearTripEventsList = () => {
    this.#tripEventsMap.forEach((presenter) => presenter.destroy());
    this.#tripEventsMap.clear();
  };

  handleTripEventChange = (updatedTripEvent) => {
    updateTripEvent(this.#tripEventsData, updatedTripEvent);
    this.#tripEventsMap.get(updatedTripEvent.id).initalize(updatedTripEvent, this.#tripOffersData, this.#tripDestinationsData);
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
    this.#tripEventsDataCopy = this.sortEventsByDay([...this.#tripEventsData]);
    this.#renderTripEvents(this.#tripEventsDataCopy);
  };
}
