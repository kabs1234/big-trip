import { render } from './framework/render.js';
import { TRIP_EVENTS } from './mocks/trip-events.js';
import { TRIP_OFFERS } from './mocks/trip-offers.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersView from './view/trip-filters-view.js';


const tripMainContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, TRIP_EVENTS, TRIP_OFFERS);
const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer, TRIP_EVENTS, TRIP_OFFERS);

render(new TripFiltersView(), tripFiltersContainer);
tripInfoPresenter.initalize();
tripEventsPresenter.initalize();
