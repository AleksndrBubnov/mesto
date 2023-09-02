export default class Section {
  #renderer;
  #containerSelector;

  constructor({ renderer }, containerSelector) {
    this.#renderer = renderer;
    this.#containerSelector = document.querySelector(containerSelector);
  }

  addItem(card, key) {
    this.#containerSelector[key](card);
  }
  
  renderCards(initialCards) {
    initialCards.forEach((item) => {
      this.#renderer(item);
    });
  }
}
