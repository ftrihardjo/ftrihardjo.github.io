import api from './api.js';

const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app');
const loginBtn = document.getElementById('github-login');
const logoutBtn = document.getElementById('logout-btn');

async function init() {
  // 1. Check if GitHub redirected back to us with a ?code= parameter
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    try {
      // Exchange the code for a JWT via our backend
      const data = await api.exchangeCode(code);
      api.setToken(data.token);
      
      // Clean the URL so we don't accidentally reuse the code
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      console.error('Login failed:', err);
      alert('Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // 2. Check if we have a token and show appropriate screen
  if (api.token) {
    showApp();
  } else {
    showLogin();
  }
}

function showLogin() {
  loginScreen.style.display = 'flex';
  appScreen.style.display = 'none';
}

function showApp() {
  loginScreen.style.display = 'none';
  appScreen.style.display = 'block';
}

// 3. Button Event Listeners
loginBtn.addEventListener('click', () => {
  window.location.href = api.getGitHubAuthUrl();
});

logoutBtn.addEventListener('click', () => {
  api.clearToken();
  showLogin();
});

// Start the app
init();