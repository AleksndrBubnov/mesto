//все попапы
export const popups = document.querySelectorAll('.popup');

//popup_type_edit
export const popupEditElement = document.querySelector('.popup_type_edit');
export const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupEditForm = popupEditElement.querySelector('.popup__form');
export const popupInpitTitle = popupEditElement.querySelector('.popup__input-text_type_title');
export const popupInpitSubtitle = popupEditElement.querySelector('.popup__input-text_type_subtitle');
export const popupEditSubmitButton = popupEditElement.querySelector('.popup__submit');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

//popup_type_add
export const popupAddElement = document.querySelector('.popup_type_add');
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
export const popupAddForm = popupAddElement.querySelector('.popup__form');
export const popupAddInpitName = popupAddElement.querySelector('.popup__input-text_type_name');
export const popupAddInpitLink = popupAddElement.querySelector('.popup__input-text_type_link');
export const popupAddSubmitButton = popupAddElement.querySelector('.popup__submit');

//popup_type_image
export const popupImageElement = document.querySelector('.popup_type_image');
export const popupImageCardElement = popupImageElement.querySelector('.popup__image-place');
export const popupImagePictureElement = popupImageElement.querySelector('.popup__image');
export const popupImageNameElement = popupImageElement.querySelector('.popup__image-name');

export const initialCards = [
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
export const cardsSectionElement = document.querySelector('.elements');
export const cardTemplateSelector = '.card-template';

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input-text_type_error'
}
