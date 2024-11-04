import { render } from './framework/render.js';

import TripEventsModel from './model/trip-events-model.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripHeaderContainerView from './view/trip-header-container-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripAddEventButtonView from './view/trip-add-event-button-view.js';
import TripFilterModel from './model/trip-filter-model.js';
import TripPointsApi from './service/trip-points-api.js';

const endPoint = 'https://17.ecmascript.htmlacademy.pro/big-trip';
const authorizationToken = 'Basic z123b8xdrdw2';

const tripPointsApi = new TripPointsApi(endPoint, authorizationToken);

const initalizeApp = () => {
  const tripMainContainer = document.querySelector('.page-body__container');
  const tripEventsContainer = document.querySelector('.trip-events');
  const tripEventsModel = new TripEventsModel(tripPointsApi);
  const tripFilterModel = new TripFilterModel();

  const tripHeaderContainer = new TripHeaderContainerView();
  const tripAddEventButtonView = new TripAddEventButtonView();

  const tripInfoPresenter = new TripInfoPresenter(tripEventsModel, tripFilterModel, tripHeaderContainer.element);
  const tripFiltersPresenter = new TripFiltersPresenter(tripEventsModel, tripFilterModel, tripHeaderContainer.element);
  const tripEventsPresenter = new TripEventsPresenter(tripEventsModel, tripFilterModel, tripEventsContainer);

  const handleAddEventFormClose = () => {
    tripAddEventButtonView.element.disabled = false;
  };

  const handleAddEventButtonClick = () => {
    tripAddEventButtonView.element.disabled = true;
    tripEventsPresenter.createTripNewEvent(handleAddEventFormClose);
  };

  render(tripHeaderContainer, tripMainContainer);
  tripFiltersPresenter.initalize();
  render(tripAddEventButtonView, tripHeaderContainer.element);

  tripInfoPresenter.initalize();
  tripEventsPresenter.initalize();
  tripEventsModel.init()
    .finally(() => {
      tripAddEventButtonView.setAddEventButtonClickHandler(handleAddEventButtonClick);
    });
};

initalizeApp();

