import './index.css';

import {
  popupAvatarOpenButtonElement,
  popupAvatarSelector,
  popupAvatarForm,
  popupEditOpenButtonElement,
  popupEditSelector,
  popupEditForm,
  profileAvatarSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  popupAddOpenButtonElement,
  popupAddSelector,
  popupAddForm,
  popupImageSelector,
  popupDeleteSelector,
  cardTemplateSelector,
  apiConfig,
  ValidationConfig,
} from "../scripts/utils/constants.js";

import Api from "../scripts/components/Api.js"
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js"
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";

const api = new Api(apiConfig);
let userId;

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    profileInfo.setUserInfo(userData);
    profileInfo.setUserAvatar(userData);
    userId = userData._id;

    cardSection.renderCards(initialCards)
  })
  .catch((err) => console.log(err));

// api.getUserData()
//   .then((userData) => {
//     profileInfo.setUserInfo(userData);
//     profileInfo.setUserAvatar(userData);
//     userId = userData._id;
//   })
//   .catch((err) => console.log(err));

// api.getInitialCards()
//   .then(initialCards => cardSection.renderCards(initialCards))
//   .catch(error => console.log(error));

const cardSection = new Section('.card-section', { renderer: renderCard });
function renderCard(item) {
  cardSection.addItem(createCard(item), 'append');
}
function createCard(data) {
  const card = new Card(data, userId, cardTemplateSelector, handleClickLike, handleClickDelete, handleClickImage);
  const cardElement = card.generate();
  return cardElement;
}

const profileInfo = new UserInfo(
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector
);

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleSubmit: popupAvatarSubmit
});

function popupAvatarSubmit(formData) {
  api.editProfileAvatar(formData)
    .then(() => {
      profileInfo.setUserAvatar(formData);
      avatarPopup.close();
    })
    .catch((err) => console.log(err));
}
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleSubmit: popupEditSubmit
});

function popupEditSubmit(formData) {
  api.editUserProfile(formData)
    .then(() => {
      profileInfo.setUserInfo(formData);
      editPopup.close();
    })
    .catch((err) => console.log(err));
}
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleSubmit: popupAddSubmit
});

function popupAddSubmit(formData) {
  addPopup.loading(true);
  api.addCard(formData)
    .then((res) => {
      cardSection.addItem(createCard(res), 'prepend');
      addPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addPopup.loading(false));
}
addPopup.setEventListeners();

const deletePopup = new PopupWithConfirmation({
  popupSelector: popupDeleteSelector,
  handleSubmit: handleClickDelete
});
deletePopup.setEventListeners();

const cardImagePopup = new PopupWithImage(popupImageSelector);
cardImagePopup.setEventListeners();

const popupAvatarFormValidation = new FormValidator(ValidationConfig, popupAvatarForm);
const popupEditFormValidation = new FormValidator(ValidationConfig, popupEditForm);
const popupAddFormValidation = new FormValidator(ValidationConfig, popupAddForm);

popupAvatarFormValidation.enableValidation();
popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();

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

function handleClickLike(cardElement) {
  if (cardElement.isLiked()) {
    api.unlikeCard(cardElement.getCardId())
      .then((res) => cardElement.likeCard(res.likes.length))
      .catch((err) => console.log(err));
  } else {
    api.likeCard(cardElement.getCardId())
      .then((res) => cardElement.likeCard(res.likes.length))
      .catch((err) => console.log(err));
  };
}

function handleClickDelete(cardElement) {
  deletePopup.open();
  deletePopup.setSubmitAction(() => {
    deletePopup.loading(true)
    api.removeCard(cardElement.getCardId())
      .then(() => {
        cardElement.deleteCard();
        deletePopup.close()
      })
      .catch((err) => console.log(err))
      .finally(() => deletePopup.loading(false))
  })
}

function handleClickImage(name, link) {
  cardImagePopup.open({ name, link });
}

