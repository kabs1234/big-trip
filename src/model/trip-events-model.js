import Observable from '../framework/observable.js';

export default class TripEventsModel extends Observable {
  #tripEvents = null;

  constructor(tripEvents) {
    super();
    this.#tripEvents = tripEvents;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  set tripEvents(newTripEvent) {
    this.#tripEvents.push(newTripEvent);
  }

  updateTripEvents = (updatingTripEvent) => {
    const changingTripEventIndex = this.tripEvents.findIndex((tripEvent) => tripEvent.id === updatingTripEvent.id);

    if (changingTripEventIndex === -1) {
      return;
    }

    this.#tripEvents = [
      ...this.tripEvents.slice(0, changingTripEventIndex),
      updatingTripEvent,
      ...this.tripEvents.slice(changingTripEventIndex + 1),
    ];
  };

  deleteTripEvents = (deletingTripEvent) => {
    const changingTripEventIndex = this.tripEvents.findIndex((tripEvent) => tripEvent.id === deletingTripEvent.id);

    if (changingTripEventIndex === -1) {
      return;
    }

    this.#tripEvents = [
      ...this.tripEvents.slice(0, changingTripEventIndex),
      ...this.tripEvents.slice(changingTripEventIndex + 1),
    ];
  };
}
