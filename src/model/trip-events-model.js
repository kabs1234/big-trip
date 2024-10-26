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

  addTripEvents(updateType, newTripEvent) {
    this.#tripEvents.push(newTripEvent);

    this._notify(updateType, newTripEvent);
  }

  updateTripEvents = (updateType, updatingTripEvent) => {
    const changingTripEventIndex = this.tripEvents.findIndex((tripEvent) => tripEvent.id === updatingTripEvent.id);

    if (changingTripEventIndex === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#tripEvents = [
      ...this.tripEvents.slice(0, changingTripEventIndex),
      updatingTripEvent,
      ...this.tripEvents.slice(changingTripEventIndex + 1),
    ];

    this._notify(updateType, updatingTripEvent);
  };

  deleteTripEvents = (updateType, deletingTripEvent) => {
    const changingTripEventIndex = this.tripEvents.findIndex((tripEvent) => tripEvent.id === deletingTripEvent.id);

    if (changingTripEventIndex === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#tripEvents = [
      ...this.tripEvents.slice(0, changingTripEventIndex),
      ...this.tripEvents.slice(changingTripEventIndex + 1),
    ];

    this._notify(updateType);

  };
}
