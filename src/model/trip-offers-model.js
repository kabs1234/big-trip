import Observable from '../framework/observable.js';

export default class TripOffersModel extends Observable {
  #tripOffers = null;

  constructor(tripOffers) {
    super();
    this.#tripOffers = tripOffers;
  }

  get tripOffers() {
    return this.#tripOffers;
  }
}
