import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  #imageElement;
  #nameElement;
  constructor(popupSelector) {
    super(popupSelector);
    this.#imageElement = document.querySelector('.popup__image');
    this.#nameElement = document.querySelector('.popup__image-name');
  }

  open({ name, link }) {
    this.#imageElement.src = link;
    this.#imageElement.alt = name;
    this.#nameElement.textContent = name;
    super.open();
  }
}
