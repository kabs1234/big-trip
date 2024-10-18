import { render} from '../framework/render.js';
import TripHeaderView from '../view/trip-header-view.js';

export default class TripHeaderPresenter {
  #container = null;
  #tripHeaderView = null;
  #tripEventsData = null;
  #tripOffersData = null;

  constructor(tripEventsData, tripOffersData, container) {
    this.#tripEventsData = tripEventsData;
    this.#tripOffersData = tripOffersData;
    this.#container = container;
    this.#tripHeaderView = new TripHeaderView(this.#tripEventsData, this.#tripOffersData);
  }

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
    render(this.#tripHeaderView , this.#container);
    this.#setEventListeners();
  }
}
