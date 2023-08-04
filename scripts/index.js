import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//все попапы
const popups = document.querySelectorAll('.popup');

//popup_type_edit
const popupEditElement = document.querySelector('.popup_type_edit');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupEditForm = popupEditElement.querySelector('.popup__form');
const popupInpitTitle = popupEditElement.querySelector('.popup__input-text_type_title');
const popupInpitSubtitle = popupEditElement.querySelector('.popup__input-text_type_subtitle');
const popupEditSubmitButton = popupEditElement.querySelector('.popup__submit');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//popup_type_add
const popupAddElement = document.querySelector('.popup_type_add');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupAddForm = popupAddElement.querySelector('.popup__form');
const popupAddInpitName = popupAddElement.querySelector('.popup__input-text_type_name');
const popupAddInpitLink = popupAddElement.querySelector('.popup__input-text_type_link');
const popupAddSubmitButton = popupAddElement.querySelector('.popup__submit');

//popup_type_image
const popupImageElement = document.querySelector('.popup_type_image');
const popupImageCardElement = popupImageElement.querySelector('.popup__image-place');
const popupImagePictureElement = popupImageElement.querySelector('.popup__image');
const popupImageNameElement = popupImageElement.querySelector('.popup__image-name');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

// Захват контейнера и селектора шаблона карточек
const cardsSectionElement = document.querySelector('.elements');
const cardTemplateSelector = '.card-template';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input-text_type_error'
}

// функция заполнения полей попапа редактирования профиля
function fillEditPopupInputs() {
  popupInpitTitle.value = profileTitle.textContent;
  popupInpitSubtitle.value = profileSubtitle.textContent;
}

//функц. выражение редактирования профиля
const editProfile = function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInpitTitle.value;
  profileSubtitle.textContent = popupInpitSubtitle.value;
  closePopup(popupEditElement);
}

popupEditForm.addEventListener('submit', editProfile);

//функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//функция закрытия попапов и по оверлею, и по кнопке
function closeByOverlayOrButton(event) {
  if (event.currentTarget === event.target || event.target.classList.contains("popup__close-button")) {
    closePopup(event.currentTarget);
  };
};

//функция закрытия попапов по клавише Esс
function closeByEscape(event){
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

//отрытие попапов
popupEditOpenButtonElement.addEventListener('click', function () {
  openPopup(popupEditElement);
  fillEditPopupInputs();
  enabledButton(popupEditSubmitButton, config);
});

popupAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
  disabledButton(popupAddSubmitButton, config);
});

// открытие попапа картинки
export function handleClickImage(name, link) {
  openPopup(popupImageElement);
  popupImageNameElement.textContent = name;
  popupImagePictureElement.alt = name;
  popupImagePictureElement.src = link;
}

//закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', closeByOverlayOrButton);
});

// функция добавления карточки в контейнер по ключу
function addCard(cardElement, key) {
  if (key === 'append') {
    cardsSectionElement.append(cardElement);
  }
  if (key === 'prepend') {
    cardsSectionElement.prepend(cardElement);
  }
}

//функц. выражение добавления карточки
const renderCard = function (event) {
  event.preventDefault();
  // addCard(createCard(popupAddInpitName.value, popupAddInpitLink.value), 'prepend');

  const addFormData = {
    name: popupAddInpitName.value, 
    link: popupAddInpitLink.value
  }

  const addFormCard = new Card(addFormData, cardTemplateSelector);

  addCard(addFormCard.generateCard(), 'prepend');
  closePopup(popupAddElement);
  event.target.reset();
}

popupAddForm.addEventListener('submit', renderCard);

// Создание карточек и добавление их в карточный контейнер (пока что .Elements)
initialCards.forEach(function(item){
  const card = new Card(item, cardTemplateSelector);
  const cardElement = card.generateCard();
  cardsSectionElement.append(cardElement);
});

// Создаения объектов валидации
const formValidation = new FormValidator(config).enableValidation();

// вкл/выкл кнопки формы
function enabledButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function disabledButton(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}