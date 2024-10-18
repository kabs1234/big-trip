export default class TripMainPresenter {
  #tripHeaderPresenter = null;
  #tripEventPresenter = null;

  constructor(tripHeaderPresenter, tripEventPresenter) {
    this.#tripHeaderPresenter = tripHeaderPresenter;
    this.#tripEventPresenter = tripEventPresenter;
  }

  initalize = () => {
    this.#tripHeaderPresenter.initalize();
    this.#tripEventPresenter.initalize();

    this.#tripHeaderPresenter.addEventToNewEventButton(this.#tripEventPresenter.renderTripNewEvent);
  };
}
