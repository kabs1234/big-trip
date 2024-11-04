import { UPDATE_TYPE, USER_ACTION } from '../constants.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import TripNewEventView from '../view/trip-new-event-view.js';

export default class TripNewEventPresenter {
  #tripNewEventView = null;
  #container = null;
  #changeData = null;
  #destroyCallback = null;

  constructor(container, changeData) {
    this.#container = container;
    this.#changeData = changeData;
  }

  handleCancelButtonClick = () => {
    this.destroy();
  };

  destroy = () => {
    if (!this.#tripNewEventView) {
      return;
    }

    remove(this.#tripNewEventView);
    this.#tripNewEventView = null;
    this.#destroyCallback();

    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  initalize = (tripOffers, tripDestinations, destroyCallback) => {
    this.#tripNewEventView = new TripNewEventView(tripOffers, tripDestinations);
    this.#destroyCallback = destroyCallback;
    render(this.#tripNewEventView, this.#container, RenderPosition.AFTERBEGIN);
    this.#tripNewEventView.setDeleteButtonClickHandler(this.handleCancelButtonClick);
    this.#tripNewEventView.setFormSubmitHandler(this.#submitTripEvent);
    document.addEventListener('keydown', this.onEscKeyDown);
  };

  setSaving = () => {
    this.#tripNewEventView.updateElement(
      {...this._state,
        isSaving: true,
        isDisabled: true,
      }
    );
  };

  setShake = () => {
    this.#tripNewEventView.updateElement({
      isSaving: false,
      isDisabled: false,
    });
    this.#tripNewEventView.shake();
  };

  #submitTripEvent = (updatedTripEvent) => {
    this.#changeData(USER_ACTION.ADD_TRIP, UPDATE_TYPE.MAJOR, updatedTripEvent);
  };

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
