export default class TripDestinationsModel {
  #tripDestinations = null;

  constructor(tripDestinations) {
    this.#tripDestinations = tripDestinations;
  }

  get tripDestinations() {
    return this.#tripDestinations;
  }
}
