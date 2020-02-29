/**
 * Authentication package
 */

export default class AuthService {
  getToken() {
    var token = localStorage.getItem("token");
    var expiration = localStorage.getItem("expiration");

    if (!token || !expiration) {
      this.destroyToken();
      return false;
    }

    if (Date.now() > parseInt(expiration, 10)) {
      return false;
    } else {
      return token;
    }
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  setToken(token, expiration) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiration);
  }

  setAccLevel(accLevel) {
    localStorage.setItem("accLevel", accLevel);
  }

  getAccLevel() {
    return localStorage.getItem("accLevel");
  }

  getPatient() {
    return JSON.parse(localStorage.getItem("sp"));
  }

  destroyToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  clearConsole() {
    localStorage.clear();
  }
}
