class MainApi {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }


  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка auth: ${res.status} ${res.statusText}`)
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
      credentials: 'include',// теперь куки посылаются вместе с запросом
      headers: this.headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._checkResponse)
  };

  logOut({ email }) {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ email })
    })
      .then(this._checkResponse)
  };

  getProfileData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this.headers,

    })
      .then(this._checkResponse);
  }

  // setProfileData(data) {
  //   return fetch(`${this.url}/users/me`, {
  //     method: 'PATCH',
  //     headers: this.headers,
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     body: JSON.stringify(data)
  //   })
  //     .then(this._checkResponse);
  // }

  // setProfileAvatar({ avatar }) {
  //   return fetch(`${this.url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: this.headers,
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     body: JSON.stringify({ avatar })
  //   })
  //     .then(this._checkResponse);
  // }

  // getInitialCards() {
  //   return fetch(`${this.url}/cards`, {
  //     method: 'GET',
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     headers: this.headers
  //   })
  //     .then(this._checkResponse);
  // }

  // setNewCard({ name, link }) {
  //   return fetch(`${this.url}/cards`, {
  //     method: 'POST',
  //     headers: this.headers,
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     body: JSON.stringify({ name, link })
  //   })
  //     .then(this._checkResponse);
  // }

  // deleteCard(id) {
  //   return fetch(`${this.url}/cards/${id}`, {
  //     method: 'DELETE',
  //     headers: this.headers,
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //   })
  //     .then(this._checkResponse);
  // }

  // addLike(id) {
  //   return fetch(`${this.url}/cards/${id}/likes`, {
  //     method: 'PUT',
  //     headers: this.headers,
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //   })
  //     .then(this._checkResponse);
  // }

  // deleteLike(id) {
  //   return fetch(`${this.url}/cards/${id}/likes`, {
  //     method: 'DELETE',
  //     headers: this.headers,
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //   })
  //     .then(this._checkResponse);
  // }

}




export const mainApi = new MainApi({
  url: 'https://api.konkravchenko.movies.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  },
});