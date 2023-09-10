class MainApi {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }


  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status)
  };


  register({ name, password, email }) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({name, password, email })
    })
      .then(this._checkResponse)
  };


  authorize({ password, email }) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._checkResponse)
  };

  signout({ email }) {
    return fetch(`${this.url}/signout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include', 
      body: JSON.stringify({ email })
    })
      .then(this._checkResponse)
  };

  getProfileData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,

    })
      .then(this._checkResponse);
  }

  changeProfileData(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      credentials: 'include', 
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  addMovie(data) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include', 
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include', 
    })
      .then(this._checkResponse);
  }
}




export const mainApi = new MainApi({
  // url: 'https://api.konkravchenko.movies.nomoreparties.co',
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  },
});