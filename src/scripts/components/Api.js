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

  addCard(cardData) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(cardData)
    })
      .then(this.#onResponce)
  }

  editCard(data, idCard) {
    return fetch(`${this.#url}/cards/${idCard}`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(data)
    })
      .then(this.#onResponce)
  }
  
  removeCard(idCard) {
    return fetch(`${this.#url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(this.#onResponce)
  }
  
  likeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.#headers
    })
      .then(this.#onResponce)
  }

  unlikeCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(this.#onResponce)
  }
}

