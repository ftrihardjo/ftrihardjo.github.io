import api from './api.js';

class AuthManager {
  constructor() {
    this.user = null;
    this.listeners = [];
  }

  async init() {
    // Check for token in URL (OAuth callback)
    const hash = window.location.hash;
    const tokenMatch = hash.match(/[?&]token=([^&]+)/);
    if (tokenMatch) {
      api.setToken(tokenMatch[1]);
      // Clean URL
      window.history.replaceState(null, '', window.location.pathname + '#/dashboard');
    }

    // If we have a token, fetch user
    if (api.token) {
      try {
        const data = await api.getMe();
        this.user = data.user;
      } catch {
        api.clearToken();
        this.user = null;
      }
    }

    this.notify();
  }

  onAuthChange(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.user));
  }

  login() {
    window.location.href = api.getGitHubAuthUrl();
  }

  logout() {
    api.clearToken();
    this.user = null;
    window.location.hash = '#/login';
    this.notify();
  }

  get isAuthenticated() {
    return !!this.user;
  }
}

const auth = new AuthManager();
export default auth;