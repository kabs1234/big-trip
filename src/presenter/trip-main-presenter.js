import { render} from '../framework/render.js';
import TripMainView from '../view/trip-main-view.js';

export default class TripMainPresenter {
  #container = null;
  #tripMainView = null;
  #tripEventsData = null;
  #tripOffersData = null;

  constructor(tripEventsData, tripOffersData, container) {
    this.#tripEventsData = tripEventsData;
    this.#tripOffersData = tripOffersData;
    this.#container = container;
    this.#tripMainView = new TripMainView(this.#tripEventsData, this.#tripOffersData);
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
