import { render, RenderPosition, replace, remove } from '../framework/render.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsContainerView from '../view/trip-events-container-view.js';
import TripNewEventView from '../view/trip-new-event-view.js';
import TripEventPresenter from './trip-event-presenter.js';

export default class TripEventsPresenter {
  #tripEventSortsView = new TripEventSortsView();
  #tripEventsContainerView = new TripEventsContainerView();
  #tripEventsMap = new Map();
  #container = null;
  #tripEventsData = null;
  #tripOffersData = null;

  constructor(tripEventsData, tripOffersData, container) {
    this.#tripEventsData = tripEventsData;
    this.#tripOffersData = tripOffersData;
    this.#container = container;
  }

  #renderTripEvents = (tripEvents, tripOffers) => {
    render(this.#tripEventsContainerView, this.#container);

    tripEvents.map((tripEvent) => {
      const tripEventPresenter = new TripEventPresenter(this.#tripEventsContainerView);
      this.#tripEventsMap.set(tripEvent, tripEventPresenter);
      tripEventPresenter.renderTripEvent(tripEvent, tripOffers);
    });
  };

  sortEventsByTime = (tripEventsMap) => {
    const sortedEntries = [...tripEventsMap.entries()].sort((a, b) => {
      const keyFromEventA = a[0];
      const keyFromEventB = b[0];

      const durationA = new Date(keyFromEventA.date_to) - new Date(keyFromEventA.date_from);
      const durationB = new Date(keyFromEventB.date_to) - new Date(keyFromEventB.date_from);

      return durationB - durationA;
    });

    return new Map(sortedEntries);
  };

  sortEventsByPrice = (tripEventsMap) => {
    const sortedEntries = [...tripEventsMap.entries()].sort((a, b) => {
      const keyFromEventA = a[0];
      const keyFromEventB = b[0];

      return keyFromEventB.base_price - keyFromEventA.base_price;
    });

    return new Map(sortedEntries);
  };

  #setSortingsHandlers = () => {
    this.#tripEventSortsView.setSortByDayClickHandler(() => {
      console.log('hi');
    });

    this.#tripEventSortsView.setSortByTimeClickHandler(() => {
      console.log('hi');
      // const tripEventsSortedByTime = this.sortEventsByTime(new Map(this.#tripEventsMap));
    });

    this.#tripEventSortsView.setSortByPriceClickHandler(() => {
      console.log('hi');
      // const tripEventsSortedByTime = this.sortEventsByPrice(new Map(this.#tripEventsMap));
    });
  };

  clearTripEventsList = () => {
    this.#tripEventsMap.forEach((presenter) => presenter.destroy());
    this.#tripEventsMap.clear();
  };

  renderTripNewEvent = () => {
    const newTripEvent = new TripNewEventView();

    render(newTripEvent, this.#tripEventsContainerView.element, RenderPosition.AFTERBEGIN);
  };

  initalize = () => {
    render(this.#tripEventSortsView, this.#container);
    this.#setSortingsHandlers();
    this.#renderTripEvents(this.#tripEventsData, this.#tripOffersData);
  };
}
