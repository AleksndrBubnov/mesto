const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupInpitTitle = popupElement.querySelector('.popup__input-title')
const popupInpitSubtitle = popupElement.querySelector('.popup__input-subtitle')
const popupForm = popupElement.querySelector('.popup__form')

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

const fillingPopupInputs = function () {
  popupInpitTitle.value = profileTitle.textContent;
  popupInpitSubtitle.value = profileSubtitle.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function (event) {
  if(event.currentTarget !== event.target) return;
    closePopup();
}

const editTitles = function (event) {
  profileTitle.textContent = popupInpitTitle.value;
  profileSubtitle.textContent = popupInpitSubtitle.value;

  event.preventDefault();
  closePopup();
}


popupOpenButtonElement.addEventListener('click', openPopup);
popupOpenButtonElement.addEventListener('click', fillingPopupInputs);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

popupForm.addEventListener('submit', editTitles);