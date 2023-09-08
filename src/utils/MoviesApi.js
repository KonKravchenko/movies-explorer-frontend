class MoviesApi {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }


  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка auth: ${res.status} ${res.statusText}`)
  }

  getMovies() {
    return fetch(`${this.url}`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(this._checkResponse);
  }
}


export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});