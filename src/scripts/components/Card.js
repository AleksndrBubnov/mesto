export default class Card {
  #data;
  #name;
  #link;
  #template;
  #handleClicklike;
  #handleClickDelete;
  #handleClickImage;
  #cardElement;
  #cardTitle;
  #cardImage;
  #cardLikeCount;
  #cardLikeButton;
  #cardDeleteButton;

  constructor(data, templateSelector, handleClicklike, handleClickDelete, handleClickImage) {
    this.#data = data;
    this.#name = data.name;
    this.#link = data.link;
    this.#template = templateSelector;
    this.#handleClicklike = handleClicklike;
    this.#handleClickDelete = handleClickDelete;
    this.#handleClickImage = handleClickImage;
  }

  generate() {
    this.#cardElement = this.#getTemplate();
    this.#cardTitle = this.#cardElement.querySelector('.card__title');
    this.#cardImage = this.#cardElement.querySelector('.card__image');
    this.#cardLikeCount = this.#cardElement.querySelector('.card__like-count')
    this.#cardLikeButton = this.#cardElement.querySelector('.card__like-button');
    this.#cardDeleteButton = this.#cardElement.querySelector('.card__delete-button');

    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#cardTitle.textContent = this.#name;

    this.#setEventListeners();

    return this.#cardElement;
  }

  #getTemplate() {
    const cardTemplate = document
      .querySelector(this.#template)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }

  remove() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  getCardId() {
    return this.#data._id;
  }

  getCardData() {
    const { _id, name, link } = this.#data;
    return { _id, name, link };
  }

  #setEventListeners() {
    this.#cardLikeButton.addEventListener('click', () => {
      this.#handleClicklike(this.#cardLikeButton);
    });

    this.#cardDeleteButton.addEventListener('click', () => {
      this.#handleClickDelete(this);
    });

    this.#cardImage.addEventListener('click', () => {
      this.#handleClickImage(this.#name, this.#link);
    });
  }
}
