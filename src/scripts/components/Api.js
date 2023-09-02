export default class Api {
  #url;
  #headers;
  constructor(apiConfig) {
    this.#url = apiConfig.url;
    this.#headers = apiConfig.headers;
  }

  #onResponce(res) {
    return res.ok
      ? res.json()
      : res.json().then(errorData => Promise.reject(errorData))
  }

  getUserData(userData) {
    return fetch(`${this.#url}/users/me`, {
      headers: this.#headers,
      body: JSON.stringify(userData)
    })
      .then(this.#onResponce)
  }

  editUserProfile(profileData) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(profileData)
    })
      .then(this.#onResponce)
  }

  editProfileAvatar(avatarData) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(avatarData)
    })
      .then(this.#onResponce)
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, { headers: this.#headers })
      .then(this.#onResponce)
  }

  getCardById(idCard) {
    return fetch(`${this.#url}/cards/${idCard}`)
      .then(this.#onResponce)
  }

  removeCard(idCard) {
    return fetch(`${this.#url}/cards/${idCard}`, {
      method: 'DELETE'
    })
      .then(this.#onResponce)
  }

  addCard(data) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this.#onResponce)
  }

  editCard(data, idCard) {
    return fetch(`${this.#url}/cards/${idCard}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this.#onResponce)
  }
}

