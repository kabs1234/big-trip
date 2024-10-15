export default class TripEventsModel {
  #tripEvents = null;

  constructor(tripEvents) {
    this.#tripEvents = tripEvents;
  }

  get tripEvents() {
    return this.#tripEvents;
  }
}
