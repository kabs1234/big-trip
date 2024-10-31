import AbstractView from '../framework/view/abstract-view';

const createTripDataLoadingMessageTemplate = () => (`
  <p class="trip-events__msg">Loading...</p>
`);

export default class TripDataLoadingView extends AbstractView {
  get template() {
    return createTripDataLoadingMessageTemplate();
  }
}
