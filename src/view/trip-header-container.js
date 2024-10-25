import AbstractView from '../framework/view/abstract-view.js';

const createTripHeaderContainer = () => (`
  <div class="trip-main">

    <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>
  </div>
`);

export default class TripHeaderContainerView extends AbstractView {
  get template() {
    return createTripHeaderContainer();
  }
}
