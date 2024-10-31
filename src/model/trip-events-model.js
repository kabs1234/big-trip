import { UPDATE_TYPE } from '../constants.js';
import Observable from '../framework/observable.js';

export default class TripEventsModel extends Observable {
  #tripPointsApi = null;
  #tripEventsData = [];
  #tripOffersData = [];
  #tripDestinationsData = [];

  constructor(tripPointsApi) {
    super();
    this.#tripPointsApi = tripPointsApi;
  }

  get tripEvents() {
    return this.#tripEventsData;
  }

  get tripOffers() {
    return this.#tripOffersData;
  }

  get tripDestinations() {
    return this.#tripDestinationsData;
  }

  init = async () => {
    try {
      const tripEventsData = await this.#tripPointsApi.tripEvents;
      const tripOffersData = await this.#tripPointsApi.tripOffers;
      const tripDestinationsData = await this.#tripPointsApi.tripDestinations;

      this.#tripEventsData = [...tripEventsData];
      this.#tripOffersData = [...tripOffersData];
      this.#tripDestinationsData = [...tripDestinationsData];
    } catch (err) {
      this.#tripEventsData = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  };

  getTripOffers = async () => {

  };

}
