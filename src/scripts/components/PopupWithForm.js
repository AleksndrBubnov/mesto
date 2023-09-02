import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  #popupElement;
  #formInput;
  #inputList;
  #handleSubmit;

  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this.#popupElement = document.querySelector(popupSelector);
    this.#formInput = this.#popupElement.querySelector('.form__input');
    this.#inputList = Array.from(this.#popupElement.querySelectorAll('.form__input'));
    this.#handleSubmit = handleSubmit;
  }

  setInputValues(data) {
    this.#inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  #getInputValues() {
    const values = {};
    this.#inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  close() {
    super.close();
    this.#formInput.form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.#popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#handleSubmit(this.#getInputValues());
    });
  }
}
