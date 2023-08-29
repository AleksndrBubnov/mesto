import './index.css';
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  popupAvatarOpenButtonElement,
  popupAvatarSelector,
  popupAvatarForm,
  popupEditOpenButtonElement,
  popupEditSelector,
  popupEditForm,
  profileTitleSelector,
  profileSubtitleSelector,
  popupAddOpenButtonElement,
  popupAddSelector,
  popupAddForm,
  popupImageSelector,
  popupDeleteSelector,
  cardTemplateSelector,
  config,
  initialCards
} from "../scripts/components/constants.js";

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleClickImage);
  const cardElement = card.generate();
  return cardElement
}

function handleClickImage(name, link) {
  cardImagePopup.open({ name, link });
}

const profileInfo = new UserInfo({ titleSelector: profileTitleSelector, subtitleSelector: profileSubtitleSelector });
profileInfo.setUserInfo({ titleText: 'Саша Бубнов', subtitleText: 'Веб-разработчик' });

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleSubmit: (formData) => {
    avatarPopup.close();
  }
});

const editPopup = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleSubmit: (formData) => {
    profileInfo.setUserInfo({
      titleText: formData.title,
      subtitleText: formData.subtitle
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

const deletePopup = new PopupWithForm({
  popupSelector: popupDeleteSelector,
  handleSubmit: (formData) => {
    deletePopup.close();
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

const popupAvatarFormValidation = new FormValidator(config, popupAvatarForm);
const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupAvatarFormValidation.enableValidation();
popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();

avatarPopup.setEventListener();
editPopup.setEventListener();
addPopup.setEventListener();
cardImagePopup.setEventListener();
deletePopup.setEventListener();

popupAvatarOpenButtonElement.addEventListener('click', function () {
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
  avatarPopup.open();
});

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
