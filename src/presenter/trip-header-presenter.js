import { render} from '../framework/render.js';
import TripHeaderView from '../view/trip-header-view.js';

export default class TripHeaderPresenter {
  #container = null;
  #tripHeaderView = null;
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

  #renderTripHeader = () => {
    this.#tripHeaderView = new TripHeaderView(this.tripEvents, this.tripOffers);
    render(this.#tripHeaderView , this.#container);
  };

  #setEventListeners = () => {
    this.#tripHeaderView.setFilterByAllClickHandler(() => {
      console.log('hi');
    });

    this.#tripHeaderView.setFilterByPastClickHandler(() => {
      console.log('hi');
    });

    this.#tripHeaderView.setFilterByFutureClickHandler(() => {
      console.log('hi');
    });
  };

  addEventToNewEventButton = (callback) => {
    this.#tripHeaderView.setAddEventButtonClickHandler(callback);
  };

  initalize() {
    this.#renderTripHeader();
    this.#setEventListeners();
  }
}
