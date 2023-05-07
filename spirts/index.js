const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.close-button');
const popupOpenButtonElement = document.querySelector('.edit-button')

const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function (event) {
  if(event.currentTarget !== event.target) return;
    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);


const popupInpitTitle = popupElement.querySelector('.popup__input-title')
const popupInpitSubtitle = popupElement.querySelector('.popup__input-subtitle')
const popupSubmit = popupElement.querySelector('.popup__submit')

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

const editTitles = function (event) {
  event.preventDefault();

  profileTitle.textContent = popupInpitTitle.value
  profileSubtitle.textContent = popupInpitSubtitle.value
  
  closePopup();
}

popupSubmit.addEventListener('click', editTitles);