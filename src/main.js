import { TRIP_EVENTS } from './mocks/trip-events.js';
import { TRIP_OFFERS } from './mocks/trip-offers.js';
import { TRIP_DESTINATIONS } from './mocks/trip-destinations.js';

import TripEventsModel from './model/trip-events-model.js';
import TripOffersModel from './model/trip-offers-model.js';
import TripDestinationsModel from './model/trip-destinations-model.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripHeaderPresenter from './presenter/trip-header-presenter.js';
import TripHeaderContainerView from './view/trip-header-container.js';

const tripMainContainer = document.querySelector('.page-body__container');
const tripEventsContainer = document.querySelector('.trip-events');

const tripHeaderContainer = new TripHeaderContainerView();

const tripEventsModel = new TripEventsModel(TRIP_EVENTS);
const tripOffersModel = new TripOffersModel(TRIP_OFFERS);
const tripDestinationsModel = new TripDestinationsModel(TRIP_DESTINATIONS);

const tripInfoPresenter = new TripHeaderPresenter(tripEventsModel, tripOffersModel, tripMainContainer);
const tripEventsPresenter = new TripEventsPresenter(tripEventsModel, tripOffersModel, tripDestinationsModel, tripEventsContainer);

tripInfoPresenter.initalize();
tripEventsPresenter.initalize();
