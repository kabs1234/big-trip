import { UPDATE_TYPE } from '../constants.js';
import Observable from '../framework/observable.js';

export default class TripEventsModel extends Observable{
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

  set tripEvents(newTripEvents) {
    this.#tripEventsData = newTripEvents;
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

  updateTripEvent = async (updateType, updatedTripEvent) => {
    try {
      const result = await this.#tripPointsApi.updateTripEvent(updatedTripEvent);

      const changingTripEventIndex = this.tripEvents.findIndex((tripEvent) => tripEvent.id === result.id);

      this.tripEvents = [
        ...this.tripEvents.slice(0, changingTripEventIndex),
        result,
        ...this.tripEvents.slice(changingTripEventIndex + 1),
      ];

      this._notify(updateType, result);
    } catch (err) {
      this._notify(UPDATE_TYPE.ERROR, updatedTripEvent);
      throw new Error('Can\'t update unexisting event');
    }
  };

  deleteTripEvent = async (updateType, deletingTripEvent) => {
    try {
      await this.#tripPointsApi.deleteTripEvent(deletingTripEvent);

      const changingTripEventIndex = this.tripEvents.findIndex((tripEvent) => tripEvent.id === deletingTripEvent.id);

      this.tripEvents = [
        ...this.tripEvents.slice(0, changingTripEventIndex),
        ...this.tripEvents.slice(changingTripEventIndex + 1),
      ];

      this._notify(updateType);
    } catch (err) {
      this._notify(UPDATE_TYPE.ERROR, deletingTripEvent);
      throw new Error('Can\'t delete unexisting event');
    }
  };

  addTripEvent = async (updateType, newTripEvent) => {
    try {
      const result = await this.#tripPointsApi.addTripEvent(newTripEvent);

      this.tripEvents = [...this.tripEvents, result];

      this._notify(updateType, newTripEvent);
    } catch(err) {
      this._notify(UPDATE_TYPE.ERROR, newTripEvent);
      throw new Error('Can\'t add unexisting event');
    }
  };
}
