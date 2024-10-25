import AbstractView from '../framework/view/abstract-view.js';

const createTripHeaderContainer = () => (`
  <div class="trip-main"></div>
`);

export default class TripHeaderContainerView extends AbstractView {
  get template() {
    return createTripHeaderContainer();
  }
}
