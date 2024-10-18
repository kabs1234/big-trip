import { render, RenderPosition, replace, remove } from '../framework/render.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import { updateTripEvent } from '../utils/utils.js';
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
  #tripEventsDataCopy = null;

  constructor(tripEventsData, tripOffersData, container) {
    this.#tripEventsData = [...tripEventsData];
    this.#tripOffersData = tripOffersData;
    this.#container = container;
  }

  #renderTripEvents = (tripEvents, tripOffers) => {
    render(this.#tripEventsContainerView, this.#container);

    tripEvents.map((tripEvent) => {
      const tripEventPresenter = new TripEventPresenter(this.#tripEventsContainerView, this.handleTripEventChange, this.handleTripEventModeChange);
      this.#tripEventsMap.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.initalize(tripEvent, tripOffers);
    });
  };

  sortEventsByTime = (tripEvents) => {
    const sortedTripEvents = tripEvents.sort((a, b) => {
      const durationA = new Date(a.date_to) - new Date(a.date_from);
      const durationB = new Date(b.date_to) - new Date(b.date_from);

      return durationB - durationA;
    });

    return sortedTripEvents;
  };

  sortEventsByPrice = (tripEvents) => {
    const sortedEntries = tripEvents.sort((a, b) => b.base_price - a.base_price);

    return sortedEntries;
  };

  #setSortingsHandlers = () => {
    this.#tripEventsDataCopy = [...this.#tripEventsData];

    this.#tripEventSortsView.setSortByDayClickHandler(() => {
      this.clearTripEventsList();
      this.#tripEventsDataCopy = [...this.#tripEventsData];
      this.#renderTripEvents(this.#tripEventsDataCopy, this.#tripOffersData);
    });

    this.#tripEventSortsView.setSortByTimeClickHandler(() => {
      this.clearTripEventsList();
      this.sortEventsByTime(this.#tripEventsDataCopy);
      this.#renderTripEvents(this.#tripEventsDataCopy, this.#tripOffersData);
    });

    this.#tripEventSortsView.setSortByPriceClickHandler(() => {
      this.clearTripEventsList();
      this.sortEventsByPrice(this.#tripEventsDataCopy);
      this.#renderTripEvents(this.#tripEventsDataCopy, this.#tripOffersData);
    });
  };

  clearTripEventsList = () => {
    this.#tripEventsMap.forEach((presenter) => presenter.destroy());
    this.#tripEventsMap.clear();
  };

  handleTripEventChange = (updatedTripEvent) => {
    updateTripEvent(this.#tripEventsData, updatedTripEvent);
    this.#tripEventsMap.get(updatedTripEvent.id).initalize(updatedTripEvent, this.#tripOffersData);
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
    this.#renderTripEvents(this.#tripEventsData, this.#tripOffersData);
  };
}
