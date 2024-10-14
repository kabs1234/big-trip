import { render } from '../framework/render.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventView from '../view/trip-event-view.js';


export default class TripEventsPresenter {
  #tripEventSorts = new TripEventSortsView();
  #tripEventView = null;
  #container = null;
  #tripEventsData = null;
  #tripOffersData = null;

  constructor(container, tripEventsData, tripOffersData) {
    this.#container = container;
    this.#tripEventsData = tripEventsData;
    this.#tripOffersData = tripOffersData;
    this.#tripEventView = new TripEventView(this.#tripEventsData, this.#tripOffersData);
  }

  initalize() {
    render(this.#tripEventSorts, this.#container);
    render(this.#tripEventView, this.#container);
  }
}
