import { render } from './framework/render.js';
import { TRIP_EVENTS } from './mocks/trip-events.js';
import { TRIP_OFFERS } from './mocks/trip-offers.js';
import { TRIP_DESTINATIONS } from './mocks/trip-destinations.js';

import TripEventsModel from './model/trip-events-model.js';
import TripOffersModel from './model/trip-offers-model.js';
import TripDestinationsModel from './model/trip-destinations-model.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripHeaderContainerView from './view/trip-header-container-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripAddEventButtonView from './view/trip-add-event-button-view.js';
import TripFilterModel from './model/trip-filter-model.js';

const tripMainContainer = document.querySelector('.page-body__container');
const tripEventsContainer = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel(TRIP_EVENTS);
const tripOffersModel = new TripOffersModel(TRIP_OFFERS);
const tripDestinationsModel = new TripDestinationsModel(TRIP_DESTINATIONS);
const tripFilterModel = new TripFilterModel();

const tripHeaderContainer = new TripHeaderContainerView();
const tripInfoPresenter = new TripInfoPresenter(tripEventsModel, tripOffersModel, tripFilterModel, tripHeaderContainer.element);
const tripFiltersPresenter = new TripFiltersPresenter(tripEventsModel, tripFilterModel, tripHeaderContainer.element);
const tripAddEventButtonView = new TripAddEventButtonView();

const tripEventsPresenter = new TripEventsPresenter(tripEventsModel, tripOffersModel, tripDestinationsModel, tripFilterModel, tripEventsContainer);

render(tripHeaderContainer, tripMainContainer);
tripInfoPresenter.initalize();
tripFiltersPresenter.initalize();
render(tripAddEventButtonView, tripHeaderContainer.element);

tripEventsPresenter.initalize();
