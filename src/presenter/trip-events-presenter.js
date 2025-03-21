import { SORT_TYPE, UPDATE_TYPE, USER_ACTION, TRIPS_FILTER, TIME_BEFORE_BLOCK, MIN_BLOCK_TIME } from '../constants.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventsContainerView from '../view/trip-events-container-view.js';
import TripNewEventView from '../view/trip-new-event-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import TripEventsEmptyView from '../view/trip-events-empty-view.js';
import TripNewEventPresenter from './trip-new-event-presenter.js';
import { filterEventsByFuture, filterEventsByPast } from '../utils/utils.js';
import TripDataLoadingView from '../view/trip-data-loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class TripEventsPresenter extends UiBlocker {
  #tripEventSortsView = null;
  #tripEventsEmptyView = null;
  #tripEventsMap = new Map();
  #tripDataLoadingView = new TripDataLoadingView();
  #tripEventsContainerView = new TripEventsContainerView();
  #container = null;
  #tripNewEventPresenter = null;
  #tripEventsModel = null;
  #tripsFilterModel = null;
  #sortType = SORT_TYPE.DAY;
  #isLoading = true;

  constructor(tripEventsModel, tripsFilterModel, container) {
    super(TIME_BEFORE_BLOCK, MIN_BLOCK_TIME);
    this.#tripEventsModel = tripEventsModel;
    this.#tripsFilterModel = tripsFilterModel;
    this.#container = container;
    this.#tripNewEventPresenter = new TripNewEventPresenter(this.#tripEventsContainerView.element, this.handleViewChange);

    tripEventsModel.addObserver(this.handleModelChange);
    tripsFilterModel.addObserver(this.handleModelChange);
  }

  get tripEvents() {
    let tripEventsCopy = [...this.#tripEventsModel.tripEvents];

    switch (this.tripsFilter) {
      case TRIPS_FILTER.FUTURE:
        tripEventsCopy = filterEventsByFuture(tripEventsCopy);
        break;
      case TRIPS_FILTER.PAST:
        tripEventsCopy = filterEventsByPast(tripEventsCopy);
        break;
    }

    switch (this.#sortType) {
      case SORT_TYPE.TIME:
        this.#sortType = SORT_TYPE.TIME;
        return this.#sortEventsByTime(tripEventsCopy);
      case SORT_TYPE.PRICE:
        this.#sortType = SORT_TYPE.PRICE;
        return this.#sortEventsByPrice(tripEventsCopy);
    }

    return this.#sortEventsByDay(tripEventsCopy);
  }

  get tripsFilter() {
    return this.#tripsFilterModel.tripFilter;
  }

  get tripOffers() {
    return this.#tripEventsModel.tripOffers;
  }

  get tripDestinations() {
    return this.#tripEventsModel.tripDestinations;
  }

  createTripNewEvent = (callback) => {
    this.#sortType = SORT_TYPE.DAY;
    this.#tripsFilterModel.setTripFilter(UPDATE_TYPE.MAJOR, TRIPS_FILTER.EVERYTHING);

    if (this.tripEvents.length === 0) {
      remove(this.#tripEventsEmptyView);
      this.#tripEventsEmptyView = null;
      this.renderTripSortings(this.#sortType);
      render(this.#tripEventsContainerView, this.#container);
    }

    this.#tripNewEventPresenter.initalize(this.tripOffers, this.tripDestinations, callback);
  };

  #renderTripEvents = (tripEvents) => {
    render(this.#tripEventsContainerView, this.#container);

    tripEvents.map((tripEvent) => {
      const tripEventPresenter = new TripEventPresenter(this.#tripEventsContainerView, this.handleViewChange, this.handleModeChange);
      this.#tripEventsMap.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.initalize(tripEvent, this.tripOffers, this.tripDestinations);
    });
  };

  #sortEventsByTime = (tripEvents) => {
    const sortedTripEventsByTime = tripEvents.sort((a, b) => {
      const durationA = new Date(a.date_to) - new Date(a.date_from);
      const durationB = new Date(b.date_to) - new Date(b.date_from);

      return durationB - durationA;
    });

    return sortedTripEventsByTime;
  };

  #sortEventsByPrice = (tripEvents) => {
    const sortedTripEventsByPrice = tripEvents.sort((a, b) => b.base_price - a.base_price);

    return sortedTripEventsByPrice;
  };

  #sortEventsByDay = (tripEvents) => {
    const sortedTripEventsByDay = tripEvents.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));

    return sortedTripEventsByDay;
  };

  #setSortingsHandlers = () => {
    this.#tripEventSortsView.setSortByDayClickHandler(() => this.renderSortedTripEvents(SORT_TYPE.DAY));
    this.#tripEventSortsView.setSortByTimeClickHandler(() => this.renderSortedTripEvents(SORT_TYPE.TIME));
    this.#tripEventSortsView.setSortByPriceClickHandler(() => this.renderSortedTripEvents(SORT_TYPE.PRICE));
  };

  renderSortedTripEvents = (sortType) => {
    if (sortType === this.#sortType) {
      return;
    }

    this.#sortType = sortType;
    this.renderTripSortings(this.#sortType);
    this.clearTripEventsList();
    this.#renderTripEvents(this.tripEvents);
  };

  clearTripEventsList = () => {
    this.#tripEventsMap.forEach((presenter) => presenter.destroy());
    this.#tripEventsMap.clear();
    this.#tripNewEventPresenter.destroy();
  };

  handleViewChange = (userAction, updateType, changingTripEvent) => {
    switch (userAction) {
      case USER_ACTION.ADD_TRIP:
        this.#tripNewEventPresenter.setSaving();
        this.#tripEventsModel.addTripEvent(updateType, changingTripEvent);
        break;
      case USER_ACTION.DELETE_TRIP:
        this.#tripEventsMap.get(changingTripEvent.id).setDeleting();
        this.#tripEventsModel.deleteTripEvent(updateType, changingTripEvent);
        break;
      case USER_ACTION.UPDATE_TRIP:
        this.#tripEventsMap.get(changingTripEvent.id).setSaving();
        this.#tripEventsModel.updateTripEvent(updateType, changingTripEvent);
        break;
    }

    this.block();
  };

  handleModelChange = (updateType, changingTripEvent) => {
    switch (updateType) {
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#tripDataLoadingView);
        this.initalize();
        break;
      case UPDATE_TYPE.PATCH:
        this.#tripEventsMap.get(changingTripEvent.id).initalize(changingTripEvent, this.tripOffers, this.tripDestinations);
        break;
      case UPDATE_TYPE.MAJOR:
        this.resetTripEventsList();
        break;
      case UPDATE_TYPE.ERROR:
        this.unblock();

        if (!changingTripEvent.id) {
          this.#tripNewEventPresenter.setShake();
          return;
        }

        this.#tripEventsMap.get(changingTripEvent.id).setShake();
        break;
    }

    this.unblock();
  };

  resetTripEventsList = () => {
    this.clearTripEventsList();

    if (this.tripEvents.length === 0) {
      remove(this.#tripEventSortsView);
      this.renderTripEventsEmptyMessage();
      this.#tripEventSortsView = this.destroyView(this.#tripEventSortsView);
      return;
    }

    this.#tripEventsEmptyView = this.destroyView(this.#tripEventsEmptyView);
    this.renderTripSortings(this.#sortType);
    this.#renderTripEvents(this.tripEvents);
  };

  handleModeChange = () => {
    this.#tripNewEventPresenter.destroy();
    this.#tripEventsMap.forEach((presenter) => presenter.resetView());
  };

  renderTripNewEvent = () => {
    const newTripEvent = new TripNewEventView();

    render(newTripEvent, this.#tripEventsContainerView.element, RenderPosition.AFTERBEGIN);
  };

  renderTripSortings = (sortType) => {
    const previousTripEventSortsView = this.#tripEventSortsView;

    this.#tripEventSortsView = new TripEventSortsView(sortType);
    this.#setSortingsHandlers();

    if (previousTripEventSortsView === null) {
      render(this.#tripEventSortsView, this.#container);
      return;
    }

    replace(this.#tripEventSortsView, previousTripEventSortsView);
    remove(previousTripEventSortsView);
  };

  renderTripEventsEmptyMessage = () => {
    const previousTripEventsEmptyView = this.#tripEventsEmptyView;

    this.#tripEventsEmptyView = new TripEventsEmptyView(this.tripsFilter);
    if (previousTripEventsEmptyView === null) {
      render(this.#tripEventsEmptyView, this.#container);
      return;
    }

    replace(this.#tripEventsEmptyView, previousTripEventsEmptyView);
    remove(previousTripEventsEmptyView);
  };

  destroyView = (view) => {
    remove(view);
    return null;
  };


  initalize = () => {
    if (this.#isLoading) {
      render(this.#tripDataLoadingView, this.#container);
      return;
    }

    if (this.tripEvents.length === 0) {
      this.renderTripEventsEmptyMessage();
      return;
    }

    this.renderTripSortings(this.#sortType);
    this.#renderTripEvents(this.tripEvents);
  };
}
