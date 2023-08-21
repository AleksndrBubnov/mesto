import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  #callback;
  constructor(popupSelector, callback) {
    super(popupSelector);
    this.#callback = callback;
  }

  #getInputValues() {

  }

  setEventListener() {
    super.setEventListener();
    // this._popup.setEventListener('', () => { });
  }

  // close() {
  //   super.close();
  // }
}