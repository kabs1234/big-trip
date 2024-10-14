import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoView = null;
  #container = null;
  #tripData = null;
  #tripOffers = null;

  constructor(container, tripData, tripOffers) {
    this.#container = container;
    this.#tripData = tripData;
    this.#tripOffers = tripOffers;
    this.#tripInfoView = new TripInfoView(this.#tripData, this.#tripOffers);
  }

  initalize() {
    render(this.#tripInfoView, this.#container, RenderPosition.AFTERBEGIN);
  }
}
