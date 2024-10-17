export default class TripPresenter {
  #tripMainPresenter = null;
  #tripEventPresenter = null;

  constructor(tripMainPresenter, tripEventPresenter) {
    this.#tripMainPresenter = tripMainPresenter;
    this.#tripEventPresenter = tripEventPresenter;
  }

  initalize = () => {
    this.#tripMainPresenter.initalize();
    this.#tripEventPresenter.initalize();


    this.#tripMainPresenter.addEventToNewEventButton(this.#tripEventPresenter.renderTripNewEvent);
  };
}
