import AbstractView from '../framework/view/abstract-view.js';

const createTripAddEventButtonTemplate = () => (`
  <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>
`);

export default class TripAddEventButtonView extends AbstractView {

  setAddEventButtonClickHandler = (callback) => {
    this._callback.addEventButtonClick = callback;

    this.element.addEventListener('click', this.#addEventButtonClickHandler);
  };

  #addEventButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addEventButtonClick();
  };

  get template() {
    return createTripAddEventButtonTemplate();
  }
}
