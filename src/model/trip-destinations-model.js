import Observable from '../framework/observable.js';

export default class TripDestinationsModel extends Observable {
  #tripDestinations = null;

  constructor(tripDestinations) {
    super();
    this.#tripDestinations = tripDestinations;
  }

  get tripDestinations() {
    return this.#tripDestinations;
  }
}
