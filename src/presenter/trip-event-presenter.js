import { USER_ACTION, UPDATE_TYPE } from '../constants.js';
import { remove, render, replace } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventView from '../view/trip-event-view.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripEventPresenter extends UiBlocker {
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
    super(0, 300);
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
    this.#tripEventEditorView = new TripEventEditorView(this.#tripEvent, this.#tripOffers, this.#tripDestinations);

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
      replace(this.#tripEventView, previousTripEventEditorView);
      this.#mode = MODE.DEFAULT;
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
    document.removeEventListener('keydown', this.onEscKeyDown);
    this.#mode = MODE.DEFAULT;
  };

  setHandlersToTripEvent = () => {
    this.#tripEventView.setEditEventClickHandler(this.openTripEventEditor);
    this.#tripEventView.setFavoriteButtonClickHandler(this.changeTripEventToFavorite);
  };

  setupTripEventEditor = () => {
    this.#tripEventEditorView.setCloseEditorClickHandler(this.closeTripEventEditor);
    this.#tripEventEditorView.setDeleteButtonClickHandler(this.deleteTripEvent);
    this.#tripEventEditorView.setFormSubmitHandler(this.submitTripEvent);
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.closeTripEventEditor();
    }
  };

  setSaving = () => {
    if (this.#mode === MODE.EDITING) {
      this.#tripEventEditorView.updateElement({
        isSaving: true,
        isDisabled: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === MODE.EDITING) {
      this.#tripEventEditorView.updateElement({
        isDeleting: true,
        isDisabled: true,
      });
    }
  };

  setShake = () => {
    if (this.#mode === MODE.EDITING) {
      this.#tripEventEditorView.updateElement({
        isSaving: false,
        isDeleting: false,
        isDisabled: false,
      });
      this.#tripEventEditorView.shake();
    } else if (this.#mode === MODE.DEFAULT) {
      this.#tripEventView.shake();
    }
  };

  changeTripEventToFavorite = () => {
    this.#changeData(USER_ACTION.UPDATE_TRIP, UPDATE_TYPE.PATCH, {...this.#tripEvent, 'is_favorite': !this.#tripEvent.is_favorite});
  };

  deleteTripEvent = () => {
    this.#changeData(USER_ACTION.DELETE_TRIP, UPDATE_TYPE.MAJOR, this.#tripEvent);
  };

  submitTripEvent = (updatedTripEvent) => {
    this.#changeData(USER_ACTION.UPDATE_TRIP, UPDATE_TYPE.MAJOR, updatedTripEvent);
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
