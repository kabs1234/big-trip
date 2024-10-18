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

  constructor(tripEventsContainer, changeData, changeMode) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  initalize = (tripEvent, tripOffers) => {
    this.#tripEvent = tripEvent;

    const previousTripEventView = this.#tripEventView;
    const previousTripEventEditorView = this.#tripEventEditorView;

    this.#tripEventView = new TripEventView(tripEvent, tripOffers);
    this.#tripEventEditorView = new TripEventEditorView(tripEvent, tripOffers);

    this.#tripEventView.setEditEventClickHandler(this.openTripEventEditor);
    this.#tripEventView.setFavoriteButtonClickHandler(this.changeTripEventToFavorite);
    this.#tripEventEditorView.setCloseEditorClickHandler(this.closeTripEventEditor);
    this.#tripEventEditorView.setDeleteButtonClickHandler(this.deleteTripEvent);

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
    document.removeEventListener('keydown', this.onEscKeyDown);
    this.#mode = MODE.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.closeTripEventEditor();
    }
  };

  changeTripEventToFavorite = () => {
    this.#changeData({...this.#tripEvent, is_favorite: !this.#tripEvent.is_favorite});
  };

  deleteTripEvent = () => {
    remove(this.#tripEventEditorView);
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
