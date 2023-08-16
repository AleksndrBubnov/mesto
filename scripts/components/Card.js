import { handleClickImage } from "../pages/index.js";

export default class Card {
  #name;
  #link;
  #template;
  #cardElement;
  #cardTitle;
  #cardImage;
  #cardLikeButton;
  #cardDeleteButton;

  constructor(data, templateSelector) {
    this.#name = data.name;
    this.#link = data.link;
    this.#template = templateSelector;
  }

  generateCard() {
    this.#cardElement = this.#getTemplate();
      this.#cardTitle = this.#cardElement.querySelector('.card__title');
      this.#cardImage = this.#cardElement.querySelector('.card__image');
      this.#cardLikeButton = this.#cardElement.querySelector('.card__like-button');
      this.#cardDeleteButton = this.#cardElement.querySelector('.card__delete-button');
    
    this.#cardTitle .textContent = this.#name;
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;

    this.#setEventListeners();

    return this.#cardElement;
  }
  
  #getTemplate() {
    const cardTemplate = document
    .querySelector(this.#template)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

  #setEventListeners() {
    this.#cardImage.addEventListener('click', () => {
      handleClickImage(this.#name, this.#link);
    });
  
    this.#cardLikeButton.addEventListener('click', () => {
      this.#cardLikeButton.classList.toggle('card__like-button_active');
    });
  
    this.#cardDeleteButton.addEventListener('click', () => {
      deleteCard(this.#cardElement);
    });
  }
}

export function likeCard(event) {
  event.currentTarget.classList.toggle('card__like-button_active');
};

export function deleteCard(card) {
  card.remove();
}
