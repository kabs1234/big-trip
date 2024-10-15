import { render } from '../framework/render.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsContainerView from '../view/trip-events-container-view.js';


export default class TripEventsPresenter {
  #tripEventSortsView = new TripEventSortsView();
  #tripEventsContainerView = new TripEventsContainerView();
  #tripEventEditorView = null;
  #container = null;
  #tripEventsData = null;
  #tripOffersData = null;

  constructor(container, tripEventsData, tripOffersData) {
    this.#container = container;
    this.#tripEventsData = tripEventsData;
    this.#tripOffersData = tripOffersData;
  }

  #renderTripEvents = (tripEvents, tripOffers) => {
    render(this.#tripEventsContainerView, this.#container);

    tripEvents.map((tripEvent) => {
      this.#renderTripEvent(tripEvent, tripOffers);
    });
  };

  #renderTripEvent = (tripEvent, tripOffers) => {
    const tripEventView = new TripEventView(tripEvent, tripOffers);

    render(tripEventView, this.#tripEventsContainerView.element);
  };

  #renderTripEventEditor = (tripEvent, tripOffers) => {
    this.#tripEventEditorView = new TripEventEditorView(tripEvent, tripOffers);

    render(this.#tripEventEditorView, this.#tripEventsContainerView.element);
  };

  initalize() {
    render(this.#tripEventSortsView, this.#container);
    this.#renderTripEventEditor(this.#tripEventsData[1], this.#tripOffersData);
    this.#renderTripEvents(this.#tripEventsData, this.#tripOffersData);
  }
}
