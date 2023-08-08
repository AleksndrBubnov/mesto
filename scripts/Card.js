import { handleClickImage } from "./index.js";

export class Card {
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
      this.#cardTitle = this.#cardElement.querySelector('.element__title');
      this.#cardImage = this.#cardElement.querySelector('.element__image');
      this.#cardLikeButton = this.#cardElement.querySelector('.element__like-button');
      this.#cardDeleteButton = this.#cardElement.querySelector('.element__delete-button');
    
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
    .querySelector('.element')
    .cloneNode(true);

    return cardTemplate;
  }

  #setEventListeners() {
    this.#cardImage.addEventListener('click', () => {
      handleClickImage(this.#name, this.#link);
    });
  
    this.#cardLikeButton.addEventListener('click', () => {
      this.#cardLikeButton.classList.toggle('element__like-button_active');
    });
  
    this.#cardDeleteButton.addEventListener('click', () => {
      deleteCard(this.#cardElement);
    });
  }
}

export function likeCard(event) {
  event.currentTarget.classList.toggle('element__like-button_active');
};

export function deleteCard(card) {
  card.remove();
}

// //**** Создании карточки, реализованное в функциональном стиле ****

// const cardTemplateElement = document.querySelector(cardTemplateSelector).content.querySelector('.element').cloneNode(true);

// function createCard(name, link) {
//   const cardElement = cardTemplateElement;
//   const cardTitle = cardElement.querySelector('.element__title');
//   const cardImage = cardElement.querySelector('.element__image');
//   const cardLikeButton = cardElement.querySelector('.element__like-button');
//   const cardDeleteButton = cardElement.querySelector('.element__delete-button');

//   //обработка клика по картинке
//   cardImage.addEventListener('click', () => {
//     handleClickImage(name, link);
//   });

//   //обработка лайка
//   cardLikeButton.addEventListener('click', likeCard);

//   //обработка кнопки удаления
//   cardDeleteButton.addEventListener('click', () => {
//     deleteCard(cardElement);
//   });

//   cardTitle.textContent = name;
//   cardImage.src = link;
//   cardImage.alt = name;

//   return cardElement;
// };
