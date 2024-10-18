import { render} from '../framework/render.js';
import TripHeaderView from '../view/trip-header-view.js';

export default class TripHeaderPresenter {
  #container = null;
  #tripMainView = null;
  #tripEventsData = null;
  #tripOffersData = null;

  constructor(tripEventsData, tripOffersData, container) {
    this.#tripEventsData = tripEventsData;
    this.#tripOffersData = tripOffersData;
    this.#container = container;
    this.#tripMainView = new TripHeaderView(this.#tripEventsData, this.#tripOffersData);
  }

  #setEventListeners = () => {
    this.#tripMainView.setFilterByAllClickHandler(() => {
      console.log('hi');
    });

    this.#tripMainView.setFilterByPastClickHandler(() => {
      console.log('hi');
    });

    this.#tripMainView.setFilterByFutureClickHandler(() => {
      console.log('hi');
    });
  };

  addEventToNewEventButton = (callback) => {
    this.#tripMainView.setAddEventButtonClickHandler(callback);
  };

  initalize() {
    render(this.#tripMainView , this.#container);
    this.#setEventListeners();
  }
}
