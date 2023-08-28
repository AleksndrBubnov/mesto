export const popupEditSelector = '.popup_type_edit';
export const popupEditElement = document.querySelector('.popup_type_edit');
export const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupEditForm = popupEditElement.querySelector('.form');
export const popupInpitTitle = popupEditElement.querySelector('.form__input_type_title');
export const popupInpitSubtitle = popupEditElement.querySelector('.form__input_type_subtitle');
export const popupEditSubmitButton = popupEditElement.querySelector('.form__submit');
export const profileTitleSelector = '.profile__title';
export const profileSubtitleSelector = '.profile__subtitle';

export const popupAddSelector = '.popup_type_add';
export const popupAddElement = document.querySelector('.popup_type_add');
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
export const popupAddForm = popupAddElement.querySelector('.form');
export const popupAddSubmitButton = popupAddElement.querySelector('.form__submit');

export const popupImageSelector = '.popup_type_image';
export const popupImageElement = document.querySelector('.popup_type_image');
export const popupImageCardElement = popupImageElement.querySelector('.popup__image-place');
export const popupImagePictureElement = popupImageElement.querySelector('.popup__image');
export const popupImageNameElement = popupImageElement.querySelector('.popup__image-name');

export const cardTemplateSelector = '.card-template';

export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_invalid',
  inputErrorClass: 'form__input_type_error'
}

export const initialCards = [
  {
    name: 'PAINKILLER',
    link: 'https://avatars.yandex.net/get-music-content/28589/7f67a401.a.3763620-1/m1000x1000'
  },
  {
    name: 'ПОВЕСТКА',
    link: 'https://avatars.yandex.net/get-music-content/2355477/be20c9fd.a.12424219-1/m1000x1000'
  },
  {
    name: 'KONSTRUKT',
    link: 'https://avatars.yandex.net/get-music-content/9707577/604ca63a.a.26546740-1/m1000x1000'
  },
  {
    name: 'Иди и смотри',
    link: 'https://avatars.yandex.net/get-music-content/2811629/8f999f47.a.12318349-1/m1000x1000'
  },
  {
    name: 'Ивар',
    link: 'https://avatars.yandex.net/get-music-content/4382806/136dcf1c.a.14056493-1/m1000x1000'
  },
  
  {
    name: 'Сказка о потерянном времени',
    link: 'https://avatars.yandex.net/get-music-content/5417945/59f3dea8.a.18893830-1/m1000x1000'
  },
];