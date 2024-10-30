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
}
