class SessionStore {
  constructor() {
    this.userId = null;
    this.username = null;
    this.accessTokenList = {};
  }

  setUser(userId, username) {
    this.userId = userId;
    this.username = username;
  }

  getUserId() {
    return this.userId;
  }

  getUsername() {
    return this.username;
  }

  addAccessToken(tokenName, token) {
    this.accessTokenList[tokenName] = token;
  }

  getAccessTokens() {
    return this.accessTokenList;
  }
}

module.exports = SessionStore;
