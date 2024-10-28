import { TRIPS_FILTER } from '../constants.js';
import AbstractView from '../framework/view/abstract-view.js';

const getEverythingListMessage = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

const getPastListMessage = () => '<p class="trip-events__msg">There are no past events now</p>';

const getFutureListMessage = () => '<p class="trip-events__msg">There are no future events now</p>';

const createTripEventsEmptyTemplate = (activeFilter) => {
  switch (activeFilter) {
    case TRIPS_FILTER.EVERYTHING:
      return getEverythingListMessage();
    case TRIPS_FILTER.PAST:
      return getPastListMessage();
    case TRIPS_FILTER.FUTURE:
      return getFutureListMessage();

  }
};

export default class TripEventsEmptyView extends AbstractView {
  #activeFilter = null;

  constructor(activeFilter) {
    super();
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createTripEventsEmptyTemplate(this.#activeFilter);
  }
}
