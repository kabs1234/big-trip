export default class TripOffersModel {
  #tripOffers = null;

  constructor(tripOffers) {
    this.#tripOffers = tripOffers;
  }

  get tripOffers() {
    return this.#tripOffers;
  }
}
