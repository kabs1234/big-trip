import { render, replace } from './framework/render.js';
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
import TripPointsApi from './service/trip-points-api.js';
import TripDataLoading from './view/trip-data-loading-view.js';

const endPoint = 'https://17.ecmascript.htmlacademy.pro/big-trip';
const authorizationToken = 'Basic z38b8jdrdwe';

const tripPointsApi = new TripPointsApi(endPoint, authorizationToken);

const initalizeApp = async () => {
  const tripMainContainer = document.querySelector('.page-body__container');
  const tripEventsContainer = document.querySelector('.trip-events');

  const tripEventsData = await tripPointsApi.tripEvents;
  const tripOffersData = await tripPointsApi.tripOffers;
  const tripDestinationsData = await tripPointsApi.tripDestinations;

  const tripEventsModel = new TripEventsModel(tripEventsData);
  const tripOffersModel = new TripOffersModel(tripOffersData);
  const tripDestinationsModel = new TripDestinationsModel(tripDestinationsData);

  const tripFilterModel = new TripFilterModel();

  const tripHeaderContainer = new TripHeaderContainerView();
  document.querySelector('.trip-main').remove();

  const tripInfoPresenter = new TripInfoPresenter(tripEventsModel, tripOffersModel, tripFilterModel, tripHeaderContainer.element);
  const tripFiltersPresenter = new TripFiltersPresenter(tripEventsModel, tripFilterModel, tripHeaderContainer.element);
  const tripAddEventButtonView = new TripAddEventButtonView();

  document.querySelector('.trip-events__msg').remove();
  const tripEventsPresenter = new TripEventsPresenter(tripEventsModel, tripOffersModel, tripDestinationsModel, tripFilterModel, tripEventsContainer);

  const handleAddEventFormClose = () => {
    tripAddEventButtonView.element.disabled = false;
  };

  const handleAddEventButtonClick = () => {
    tripAddEventButtonView.element.disabled = true;
    tripEventsPresenter.createTripNewEvent(handleAddEventFormClose);
  };

  tripAddEventButtonView.setAddEventButtonClickHandler(handleAddEventButtonClick);

  render(tripHeaderContainer, tripMainContainer);
  tripInfoPresenter.initalize();
  tripFiltersPresenter.initalize();
  render(tripAddEventButtonView, tripHeaderContainer.element);

  tripEventsPresenter.initalize();
};

document.body.innerHTML = '';
const tripLoadingElement = new TripDataLoading().element;

document.body.append(tripLoadingElement.children[0], tripLoadingElement.children[1]);
initalizeApp();

