export default class UserInfo {
  #name;
  #description;

  constructor({ nameSelector, descriptionSelector })  {
    this.#name = document.querySelector(nameSelector);
    this.#description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return { 
      name: this.#name.textContent, 
      description: this.#description.textContent
    };
  }

  setUserInfo({ nameText, descriptionText}) {
    this.#name.textContent = nameText;
    this.#description.textContent = descriptionText;
  }
}
