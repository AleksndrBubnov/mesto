import '../../pages/index.css';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupEditSelector,
  popupEditOpenButtonElement,
  popupEditForm,
  popupInpitTitle,
  popupInpitSubtitle,
  profileTitleSelector,
  profileSubtitleSelector,
  popupAddSelector,
  popupAddOpenButtonElement,
  popupAddForm,
  popupImageSelector,
  popupImagePictureElement,
  popupImageNameElement,
  cardTemplateSelector,
  config,
  initialCards
} from "../utils/constants.js";
import { } from "../utils/utils.js";

const profileInfo = new UserInfo({
  titleSelector: profileTitleSelector,
  subtitleSelector: profileSubtitleSelector
});

profileInfo.setUserInfo({
  titleText: 'Саша Бубнов',
  subtitleText: 'Веб-разработчик'
});

const editPopup = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleSubmit: (formData) => {
    profileInfo.setUserInfo({
      titleText: popupInpitTitle.value,
      subtitleText: popupInpitSubtitle.value
    });
    editPopup.close();
  }
});

const addPopup = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleSubmit: (formData) => {
    const cardElement = createCard(formData);
    cardSection.addItem(cardElement, 'prepend');
    addPopup.close();
  }
});

const cardImagePopup = new PopupWithImage(popupImageSelector);

const sectionData = {
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(
      createCard(item),
      'append'
    );
  }
}

const cardSection = new Section(sectionData, '.card-section');
cardSection.renderItems();

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleClickImage);
  const cardElement = card.generate();
  return cardElement
}

const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();

editPopup.setEventListener();
addPopup.setEventListener();
cardImagePopup.setEventListener();

popupEditOpenButtonElement.addEventListener('click', function () {
  editPopup.setInputValues(profileInfo.getUserInfo());
  popupEditFormValidation.resetValidation();
  popupEditFormValidation.enabledButton();
  editPopup.open();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
  addPopup.open();
});

function handleClickImage(name, link) {
  popupImageNameElement.textContent = name;
  popupImagePictureElement.alt = name;
  popupImagePictureElement.src = link;
  cardImagePopup.open();
}