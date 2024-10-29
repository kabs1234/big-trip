import { nanoid } from 'nanoid';
import { createDestinationContainer, createTripEventDestinationList, createTripEventOffers, createTripEventTime, createTripEventTypeCheckbox } from '../utils/trip-creator-views.js';
import TripEventCreator from '../utils/trip-event-creator.js';

const createTripNewEventTemplate = (tripEvent, tripOffers, tripDestinations) => (`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTripEventTypeCheckbox(tripEvent)}

        ${createTripEventDestinationList(tripEvent, tripDestinations)}

        ${createTripEventTime(tripEvent)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min='1' name="event-price" value='${tripEvent.base_price}'>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        ${createTripEventOffers(tripEvent, tripOffers)}
        ${createDestinationContainer(tripEvent, tripDestinations)}
      </section>
    </form>
  </li>
`);

export default class TripNewEventView extends TripEventCreator {
  #tripOffers = null;
  #tripDestinations = null;

  constructor(tripOffers, tripDestinations) {
    super(TripNewEventView, tripDestinations);
    this._state = TripNewEventView.parseTripEventToState({
      'id': nanoid(),
      'type': 'bus',
      'date_from': '',
      'date_to': '',
      'destination': {
        'name': '',
        'description': '',
        'pictures': []
      },
      'base_price': 0,
      'is_favorite': false,
      'offers': []
    });
    this.#tripOffers = tripOffers;
    this.#tripDestinations = tripDestinations;
    this.setInnerHandlers();
  }

  get template() {
    return createTripNewEventTemplate(this._state, this.#tripOffers, this.#tripDestinations);
  }
}
