import AbstractView from '../framework/view/abstract-view.js';

const getEverythingFilterEmptyListMessage = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

const getPastFilterEmptyListMessage = () => ('There are no past events now');

const getFutureFilterEmptyListMessage = () => ('There are no future events now');

const createTripEventsEmptyTemplate = (selectedFilter) => ('');

class TripEventsEmptyView extends AbstractView {
  #selectedFilter = null;

  constructor(selectedFilter) {
    super();
    this.#selectedFilter = selectedFilter;
  }

  get template() {
    createTripEventsEmptyTemplate();
  }
}
