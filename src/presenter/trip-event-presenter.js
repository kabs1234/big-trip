import { USER_ACTION, UPDATE_TYPE } from '../constants.js';
import { remove, render, replace } from '../framework/render.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventView from '../view/trip-event-view.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #tripEventEditorView = null;
  #tripEventView = null;
  #changeData = null;
  #changeMode = null;
  #mode = MODE.DEFAULT;
  #tripEvent = null;
  #tripOffers = null;
  #tripDestinations = null;

  constructor(tripEventsContainer, changeData, changeMode) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  initalize = (tripEvent, tripOffers, tripDestinations) => {
    this.#tripEvent = tripEvent;
    this.#tripOffers = tripOffers;
    this.#tripDestinations = tripDestinations;

    const previousTripEventView = this.#tripEventView;
    const previousTripEventEditorView = this.#tripEventEditorView;

    this.#tripEventView = new TripEventView(this.#tripEvent, this.#tripOffers);
    this.setupTripEventEditor();
    this.setHandlersToTripEvent();

    if (previousTripEventView === null && previousTripEventEditorView === null) {
      render(this.#tripEventView, this.#tripEventsContainer.element);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#tripEventView, previousTripEventView);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#tripEventEditorView, previousTripEventEditorView);
    }

    remove(previousTripEventView);
    remove(previousTripEventEditorView);
  };

  openTripEventEditor = () => {
    replace(this.#tripEventEditorView, this.#tripEventView);
    document.addEventListener('keydown', this.onEscKeyDown);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  closeTripEventEditor = () => {
    replace(this.#tripEventView, this.#tripEventEditorView);
    this.setupTripEventEditor();

    this.#tripEventEditorView.reset(this.#tripEvent);
    document.removeEventListener('keydown', this.onEscKeyDown);
    this.#mode = MODE.DEFAULT;
  };

  setHandlersToTripEvent = () => {
    this.#tripEventView.setEditEventClickHandler(this.openTripEventEditor);
    this.#tripEventView.setFavoriteButtonClickHandler(this.changeTripEventToFavorite);
  };

  setupTripEventEditor = () => {
    this.#tripEventEditorView = new TripEventEditorView(this.#tripEvent, this.#tripOffers, this.#tripDestinations);
    this.#tripEventEditorView.setCloseEditorClickHandler(this.closeTripEventEditor);
    this.#tripEventEditorView.setDeleteButtonClickHandler(this.deleteTripEvent);
    this.#tripEventEditorView.setFormSubmitHandler(this.submitTripEvent);
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.closeTripEventEditor();
    }
  };

  changeTripEventToFavorite = () => {
    this.#changeData(USER_ACTION.UPDATE_TRIP, UPDATE_TYPE.PATCH, {...this.#tripEvent, is_favorite: !this.#tripEvent.is_favorite});
  };

  deleteTripEvent = () => {
    this.#changeData(USER_ACTION.DELETE_TRIP, UPDATE_TYPE.MINOR, this.#tripEvent);
    remove(this.#tripEventEditorView);
  };

  submitTripEvent = (updatedTripEvent) => {
    this.#tripEvent = updatedTripEvent;
    const updatedTripEventView = new TripEventView(this.#tripEvent, this.#tripOffers);
    replace(updatedTripEventView, this.#tripEventEditorView);

    this.#tripEventView = updatedTripEventView;
    this.setHandlersToTripEvent();
    this.setupTripEventEditor();
    this.#mode = MODE.DEFAULT;
    this.#changeData(USER_ACTION.UPDATE_TRIP, UPDATE_TYPE.PATCH, this.#tripEvent);
  };

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.closeTripEventEditor();
    }
  };

  destroy = () => {
    remove(this.#tripEventView);
    remove(this.#tripEventEditorView);
  };
}
