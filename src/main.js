import { render } from './framework/render.js';
import { TRIP_EVENTS } from './mocks/trip-events.js';
import { TRIP_OFFERS } from './mocks/trip-offers.js';
import TripEventsModel from './model/trip-events-model.js';
import TripOffersModel from './model/trip-offers-model.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersView from './view/trip-filters-view.js';


const tripMainContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel(TRIP_EVENTS);
const tripOffersModel = new TripOffersModel(TRIP_OFFERS);

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, tripEventsModel.tripEvents, tripOffersModel.tripOffers);
const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer, tripEventsModel.tripEvents, tripOffersModel.tripOffers);

render(new TripFiltersView(), tripFiltersContainer);
tripInfoPresenter.initalize();
tripEventsPresenter.initalize();
