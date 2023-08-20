export default class UserInfo {
  #data;
  constructor(name, about ) {
    this.#data = {name, about};
  }

  getUserInfo() {
    return this.#data;
  }

  setUserInfo({ name, about}) {
    this.#data = { name, about};
  }
}
