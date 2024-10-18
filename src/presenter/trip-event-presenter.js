import { remove, render, replace } from '../framework/render.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventView from '../view/trip-event-view.js';

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #tripEventEditorView = null;
  #tripEventView = null;

  constructor(tripEventsContainer) {
    this.#tripEventsContainer = tripEventsContainer;
  }

  renderTripEvent = (tripEvent, tripOffers) => {
    const previousTripEventView = this.#tripEventView;

    this.#tripEventView = new TripEventView(tripEvent, tripOffers);

    this.#tripEventView.setEditEventClickHandler(() => {
      this.renderTripEventEditor(tripEvent, tripOffers, this.#tripEventView);
    });

    this.#tripEventView.setFavoriteButtonClickHandler(() => {
      console.log('hi');
    });

    if (previousTripEventView === null) {
      render(this.#tripEventView, this.#tripEventsContainer.element);
      return;
    }

    if (this.#tripEventsContainer.contains(previousTripEventView.element)) {
      replace(this.#tripEventView, previousTripEventView);
    }

    remove(previousTripEventView);
  };

  renderTripEventEditor = (tripEvent, tripOffers, element) => {
    this.#tripEventEditorView = new TripEventEditorView(tripEvent, tripOffers);
    replace(this.#tripEventEditorView, element);

    this.#tripEventEditorView.setCloseEditorClickHandler(() => {
      replace(element, this.#tripEventEditorView);
    });

    this.#tripEventEditorView.setDeleteButtonClickHandler(() => {
      remove(this.#tripEventEditorView);
    });
  };

  destroy = () => {
    remove(this.#tripEventView);
    remove(this.#tripEventEditorView);
  };
}
