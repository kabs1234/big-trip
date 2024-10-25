import { render } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #container = null;
  #tripInfoView = null;
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

  #renderTripInfo = () => {
    this.#tripInfoView = new TripInfoView(this.tripEvents, this.tripOffers);
    render(this.#tripInfoView , this.#container);
  };

  initalize() {
    this.#renderTripInfo();
  }
}
