import { TRIPS_FILTER } from '../constants.js';
import Observable from '../framework/observable.js';

export default class TripFilterModel extends Observable {
  #tripFilter = TRIPS_FILTER.EVERYTHING;

  get tripFilter() {
    return this.#tripFilter;
  }

  setTripFilter(updateType, newTripFilter) {
    this.#tripFilter = newTripFilter;

    this._notify(updateType, newTripFilter);
  }
}
