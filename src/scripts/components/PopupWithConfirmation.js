import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  #popupElement;
  #popupButton;
  #handleSubmit;
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this.#popupElement = document.querySelector(popupSelector);
    this.#popupButton = this.#popupElement.querySelector('.form__submit');
    this.#handleSubmit = handleSubmit;
  }

  loading(isLoading) {
    (isLoading)
    ? this.#popupButton.textContent = 'Удаление...'
    : this.#popupButton.textContent = 'Да'
  }

  setSubmitAction(action) {
    this.#handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmit();
    });
  }
}