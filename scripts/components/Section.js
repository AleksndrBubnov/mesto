export default class Section {
  #items;
  #renderer;
  #containerSelector;

  constructor({ items, renderer }, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#containerSelector = document.querySelector(containerSelector);
  }

  addItem(card, key) {
    this.#containerSelector[key](card);
  }
  
  renderItems() {
    this.#items.forEach((item) => {
      this.#renderer(item);
    });
  }
}
