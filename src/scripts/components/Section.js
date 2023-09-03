export default class Section {
  #containerSelector;
  #renderer;

  constructor(containerSelector, { renderer }) {
    this.#containerSelector = document.querySelector(containerSelector);
    this.#renderer = renderer;
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
