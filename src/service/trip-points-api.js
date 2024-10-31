import { METHOD } from '../constants.js';
import ApiService from '../framework/api-service.js';

export default class TripPointsApi extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  get tripEvents() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  get tripOffers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  get tripDestinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  updateTripEvent = async (update) => {
    const request = this._load({
      url: `points/${update.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(update),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const result = await ApiService.parseResponse(request);

    return result;
  };
}
