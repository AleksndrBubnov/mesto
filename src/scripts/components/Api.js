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

  getInitialCards() {
    return fetch(`${this.#url}/cards`, { headers: this.#headers })
      .then(this.#onResponce)
  }

  // getAllCards() {
  //   return fetch(`${this._url}/cards`, { headers: this._headers })
  //     .then(
  //       this._handleReply
  //     );
  // }

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

