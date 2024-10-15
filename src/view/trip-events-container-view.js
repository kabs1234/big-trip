import AbstractView from '../framework/view/abstract-view.js';

const createTripEventsContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsContainerView extends AbstractView {
  get template() {
    return createTripEventsContainerTemplate();
  }
}
