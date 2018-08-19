export default class ApiClient {
  _fetch = (url) => {
    return fetch(url).then((response) => { // .json()?
      if (response < 400) {
        return response.json()
      }

      let data = null;
      try {
        data = JSON.parse(response.text());
      }
      catch (exp) {}
      return Promise.reject({status: response.status, message: response.statusText, data});
    });
  };

  fetchTokenStatistics(token) {
    const url = '/api';
    return this._fetch(`${url}?token=${token}`)
  }
}