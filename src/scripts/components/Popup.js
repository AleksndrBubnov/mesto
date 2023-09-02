export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  #handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this.#handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.#handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
