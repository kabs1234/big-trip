import TripEventsPresenter from './trip-events-presenter';
import TripInfoPresenter from './trip-info-presenter';

export default class TripMainPresenter {
  #tripEventsModel = null;
  #tripOffersModel = null;
  #tripDestinationsModel = null;
  #tripsFilterModel = null;
  #container = null;
  #tripEventsPresenter = null;
  #tripInfoPresenter = null;

  constructor(tripEventsModel, tripOffersModel, tripDestinationsModel, tripsFilterModel, container) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripOffersModel = tripOffersModel;
    this.#tripDestinationsModel = tripDestinationsModel;
    this.#tripsFilterModel = tripsFilterModel;
    this.#container = container;
  }

  initalize = () => {
    this.#tripEventsModel.init();

    this.#tripEventsPresenter = new TripEventsPresenter(this.#tripEventsModel, this.#tripOffersModel, this.#tripDestinationsModel, this.#tripsFilterModel, this.#container);
    this.#tripInfoPresenter = new TripInfoPresenter(this.#tripEventsModel, this.#tripOffersModel, this.#tripsFilterModel, this.#container);

    this.#tripEventsPresenter.initalize();
    this.#tripInfoPresenter.initalize();
  };
}
