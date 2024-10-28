import * as dayjs from 'dayjs';
import { SORT_TYPE, UPDATE_TYPE, USER_ACTION, TRIPS_FILTER } from '../constants.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import TripEventSortsView from '../view/trip-event-sorts-view.js';
import TripEventsContainerView from '../view/trip-events-container-view.js';
import TripNewEventView from '../view/trip-new-event-view.js';
import TripEventPresenter from './trip-event-presenter.js';
import TripEventsEmptyView from '../view/trip-events-empty-view.js';

export default class TripEventsPresenter {
  #tripEventSortsView = null;
  #tripEventsEmptyView = null;
  #tripEventsContainerView = null;
  #tripEventsMap = new Map();
  #container = null;
  #tripEventsModel = null;
  #tripOffersModel = null;
  #tripDestinationsModel = null;
  #tripsFilterModel = null;
  #sortType = SORT_TYPE.DAY;

  constructor(tripEventsModel, tripOffersModel, tripDestinationsModel, tripsFilterModel, container) {
    this.#tripEventsModel = tripEventsModel;
    this.#tripOffersModel = tripOffersModel;
    this.#tripDestinationsModel = tripDestinationsModel;
    this.#tripsFilterModel = tripsFilterModel;
    this.#container = container;

    tripEventsModel.addObserver(this.handleTripModelChange);
    tripsFilterModel.addObserver(this.handleTripModelChange);
  }

  get tripEvents() {
    let tripEventsCopy = [...this.#tripEventsModel.tripEvents];

    switch (this.tripsFilter) {
      case TRIPS_FILTER.FUTURE:
        tripEventsCopy = this.filterEventsByFuture(tripEventsCopy);
        break;
      case TRIPS_FILTER.PAST:
        tripEventsCopy = this.filterEventsByPast(tripEventsCopy);
        break;
    }

    switch (this.#sortType) {
      case SORT_TYPE.TIME:
        this.#sortType = SORT_TYPE.TIME;
        return this.sortEventsByTime(tripEventsCopy);
      case SORT_TYPE.PRICE:
        this.#sortType = SORT_TYPE.PRICE;
        return this.sortEventsByPrice(tripEventsCopy);
    }

    return this.sortEventsByDay(tripEventsCopy);
  }

  get tripsFilter() {
    return this.#tripsFilterModel.tripFilter;
  }

  get tripOffers() {
    return this.#tripOffersModel.tripOffers;
  }

  get tripDestinations() {
    return this.#tripDestinationsModel.tripDestinations;
  }

  #renderTripEventsContainer = () => {
    const previousTripEventsContainer = this.#tripEventsContainerView;

    this.#tripEventsContainerView = new TripEventsContainerView();
    if (previousTripEventsContainer === null) {
      render(this.#tripEventsContainerView, this.#container);
      return;
    }

    replace(this.#tripEventsContainerView, previousTripEventsContainer);
    remove(previousTripEventsContainer);
  };

  #renderTripEvents = (tripEvents) => {
    this.#renderTripEventsContainer();

    tripEvents.map((tripEvent) => {
      const tripEventPresenter = new TripEventPresenter(this.#tripEventsContainerView, this.handleTripViewChange, this.handleTripEventModeChange);
      this.#tripEventsMap.set(tripEvent.id, tripEventPresenter);
      tripEventPresenter.initalize(tripEvent, this.tripOffers, this.tripDestinations);
    });
  };

  sortEventsByTime = (tripEvents) => {
    const sortedTripEventsByTime = tripEvents.sort((a, b) => {
      const durationA = new Date(a.date_to) - new Date(a.date_from);
      const durationB = new Date(b.date_to) - new Date(b.date_from);

      return durationB - durationA;
    });

    return sortedTripEventsByTime;
  };

  sortEventsByPrice = (tripEvents) => {
    const sortedTripEventsByPrice = tripEvents.sort((a, b) => b.base_price - a.base_price);

    return sortedTripEventsByPrice;
  };

  sortEventsByDay = (tripEvents) => {
    const sortedTripEventsByDay = tripEvents.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));

    return sortedTripEventsByDay;
  };

  filterEventsByFuture = (tripEvents) => {
    const filteredEventsByFuture = tripEvents.filter((tripEvent) => {
      const currentDate = dayjs();
      const startDate = dayjs(tripEvent.date_from);

      return startDate.isAfter(currentDate);
    });

    return filteredEventsByFuture;
  };

  filterEventsByPast = (tripEvents) => {
    const filteredEventsByPast = tripEvents.filter((tripEvent) => {
      const currentDate = dayjs();
      const endDate = dayjs(tripEvent.date_to);

      return endDate.isBefore(currentDate);
    });

    return filteredEventsByPast;
  };

  #setSortingsHandlers = () => {
    this.#tripEventSortsView.setSortByDayClickHandler(() => {
      this.renderSortedTripEvents(SORT_TYPE.DAY);
    });

    this.#tripEventSortsView.setSortByTimeClickHandler(() => {
      this.renderSortedTripEvents(SORT_TYPE.TIME);
    });

    this.#tripEventSortsView.setSortByPriceClickHandler(() => {
      this.renderSortedTripEvents(SORT_TYPE.PRICE);
    });
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
  };

  handleTripViewChange = (userAction, updateType, changingTripEvent) => {
    switch (userAction) {
      case USER_ACTION.ADD_TRIP:
        this.#tripEventsModel.addTripEvents(updateType, changingTripEvent);
        break;
      case USER_ACTION.DELETE_TRIP:
        this.#tripEventsModel.deleteTripEvents(updateType, changingTripEvent);
        break;
      case USER_ACTION.UPDATE_TRIP:
        this.#tripEventsModel.updateTripEvents(updateType, changingTripEvent);
        break;
    }
  };

  handleTripModelChange = (updateType, changingTripEvent) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#tripEventsMap.get(changingTripEvent.id).initalize(changingTripEvent, this.tripOffers, this.tripDestinations);
        break;
      case UPDATE_TYPE.MINOR:
        this.clearTripEventsList();
        this.#renderTripEvents(this.tripEvents);
        break;
      case UPDATE_TYPE.MAJOR:
        this.clearTripEventsList();
        this.#tripEventsContainerView = this.destroyView(this.#tripEventsContainerView);

        if (this.tripEvents.length === 0) {
          remove(this.#tripEventSortsView);
          this.renderTripEventsEmptyMessage();
          this.#tripEventSortsView = this.destroyView(this.#tripEventSortsView);
          return;
        }

        this.#tripEventsEmptyView = this.destroyView(this.#tripEventsEmptyView);
        this.#sortType = SORT_TYPE.DAY;
        this.renderTripSortings(this.#sortType);
        this.#renderTripEvents(this.tripEvents);
        break;
    }
  };

  handleTripEventModeChange = () => {
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
    if (this.tripEvents.length === 0) {
      this.renderTripEventsEmptyMessage();
      return;
    }

    this.renderTripSortings(this.#sortType);
    this.#renderTripEvents(this.tripEvents);
  };
}
