import { render, RenderPosition, replace, remove } from '../framework/render.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsContainerView from '../view/trip-events-container-view.js';
import TripNewEventView from '../view/trip-new-event-view.js';

export default class TripEventsPresenter {
  #tripEventSortsView = new TripEventSortsView();
  #tripEventsContainerView = new TripEventsContainerView();
  #tripEventsMap = new Map();
  #tripEventEditorView = null;
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
      this.#renderTripEvent(tripEvent, tripOffers);
    });
  };

  #renderTripEvent = (tripEvent, tripOffers) => {
    const tripEventView = new TripEventView(tripEvent, tripOffers);
    this.#tripEventsMap.set(tripEvent, tripEventView);
    render(tripEventView, this.#tripEventsContainerView.element);

    tripEventView.setEditEventClickHandler(() => {
      this.#renderTripEventEditor(tripEvent, tripOffers, tripEventView);
    });

    tripEventView.setFavoriteButtonClickHandler(() => {
      console.log('hi');
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
      this.#rerenderTripEvents(this.#tripEventsMap, this.#tripOffersData);
    });

    this.#tripEventSortsView.setSortByTimeClickHandler(() => {
      const tripEventsSortedByTime = this.sortEventsByTime(new Map(this.#tripEventsMap));

      this.#rerenderTripEvents(tripEventsSortedByTime, this.#tripOffersData);
    });

    this.#tripEventSortsView.setSortByPriceClickHandler(() => {
      const tripEventsSortedByTime = this.sortEventsByPrice(new Map(this.#tripEventsMap));

      this.#rerenderTripEvents(tripEventsSortedByTime, this.#tripOffersData);
    });
  };

  #renderTripEventEditor = (tripEvent, tripOffers, element) => {
    this.#tripEventEditorView = new TripEventEditorView(tripEvent, tripOffers);
    replace(this.#tripEventEditorView, element);
    console.log();

    this.#tripEventEditorView.setCloseEditorClickHandler(() => {
      replace(element, this.#tripEventEditorView);
    });

    this.#tripEventEditorView.setDeleteButtonClickHandler(() => {
      this.#tripEventsMap.delete(tripEvent);
      remove(this.#tripEventEditorView);
    });
  };

  #rerenderTripEvents = (tripEventsMap, tripOffers) => {
    remove(this.#tripEventsContainerView);
    this.#tripEventsContainerView = new TripEventsContainerView();
    render(this.#tripEventsContainerView, this.#container);
    tripEventsMap.forEach((value, key) => this.#rerenderTripEvent(key, value, tripOffers));
  };

  #rerenderTripEvent = (tripEvent, tripEventView, tripOffers) => {
    render(tripEventView, this.#tripEventsContainerView.element);

    tripEventView.setEditEventClickHandler(() => {
      this.#renderTripEventEditor(tripEvent, tripOffers, tripEventView);
    });

    tripEventView.setFavoriteButtonClickHandler(() => {
      console.log('hi');
    });
  };

  renderTripNewEvent = () => {
    const newTripEvent = new TripNewEventView();

    render(newTripEvent, this.#tripEventsContainerView.element, RenderPosition.AFTERBEGIN);
  };

  initalize = () => {
    render(this.#tripEventSortsView, this.#container);
    this.#renderTripEvents(this.#tripEventsData, this.#tripOffersData);
    this.#setSortingsHandlers();
  };
}
