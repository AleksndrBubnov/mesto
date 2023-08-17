import { 
  popups,
  popupEditElement,
  popupEditOpenButtonElement,
  popupEditForm,
  popupInpitTitle,
  popupInpitSubtitle,
  profileTitle,
  profileSubtitle,
  popupAddElement,
  popupAddOpenButtonElement,
  popupAddForm,
  popupAddInpitName,
  popupAddInpitLink,
  popupImageElement,
  popupImagePictureElement,
  popupImageNameElement,
  initialCards,
  cardsSectionElement,
  cardTemplateSelector,
  config
} from "../utils/constants.js";
// import {...} from "../utils/utils.js";
import Popup from "../components/Popup.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";


const popupWithImage = new PopupWithImage(popupImageElement);
popupWithImage.open();

// Создаения объектов валидации
const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();

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
  popupEditFormValidation.resetValidation();
  popupEditFormValidation.enabledButton();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
});

//закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', closeByOverlayOrButton);
});

export function handleClickImage(name, link) {
  openPopup(popupImageElement);
  popupImageNameElement.textContent = name;
  popupImagePictureElement.alt = name;
  popupImagePictureElement.src = link;
}
// export function handleCardClick(name, link) {
//   // устанавливаем ссылку
//   popupImagePictureElement.src = link;
//   // устанавливаем подпись картинке
//   popupImagePictureElement.alt = name;
//   // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
//   openPopup(popupImageElement);
// }


function addCard(cardElement, key) {
  cardsSectionElement[key](cardElement);
} 

function createCard (data, cardTemplateSelector) {
  const card = new Card(data, cardTemplateSelector).generateCard();
  return card;
}

const renderCardFromForm = function (event) {
  event.preventDefault();

  const addFormData = {
    name: popupAddInpitName.value, 
    link: popupAddInpitLink.value
  }

  addCard(createCard(addFormData, cardTemplateSelector), 'prepend');

  closePopup(popupAddElement);
  event.target.reset();
}

popupAddForm.addEventListener('submit', renderCardFromForm);

initialCards.forEach(function(item){
  addCard(createCard(item, cardTemplateSelector), 'append');
});
