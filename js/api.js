const API_BASE = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-e6f6298f-438d-4b62-8a67-95172ce09da9/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('km_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('km_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('km_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      this.clearToken();
      window.location.hash = '#/login';
      throw new Error('Session expired');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Step 1: Redirect to GitHub
  getGitHubAuthUrl() {
    const clientId = 'Iv23liUFEZYT2ZQkdgcu'; // Make sure this is correct!
    const redirectUri = window.location.origin; // e.g., https://asha.works
    const scope = 'read:user,user:email';
    
    // Save the redirectUri so we can send it to the backend later
    sessionStorage.setItem('oauth_redirect_uri', redirectUri);

    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  }

  // Step 2: Exchange code for JWT
  async exchangeCode(code) {
    // Retrieve the exact redirectUri used in step 1
    const redirectUri = sessionStorage.getItem('oauth_redirect_uri') || window.location.origin;
    
    return this.request('/auth/exchange', {
      method: 'POST',
      body: JSON.stringify({ 
        code,
        redirect_uri: redirectUri // Send it to the backend!
      }),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Search
  async searchCode(query, { repo, lang, page, limit } = {}) {
    const params = new URLSearchParams({ q: query });
    if (repo) params.set('repo', repo);
    if (lang) params.set('lang', lang);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    return this.request(`/search/code?${params}`);
  }

  async searchKnowledge(query, { type, tag, page, limit } = {}) {
    const params = new URLSearchParams({ q: query });
    if (type) params.set('type', type);
    if (tag) params.set('tag', tag);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    return this.request(`/search/knowledge?${params}`);
  }

  // Knowledge
  async listKnowledge({ type, repo, page, limit } = {}) {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (repo) params.set('repo', repo);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    return this.request(`/knowledge?${params}`);
  }

  async createKnowledge(data) {
    return this.request('/knowledge', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getKnowledge(id) {
    return this.request(`/knowledge/${id}`);
  }

  async updateKnowledge(id, data) {
    return this.request(`/knowledge/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteKnowledge(id) {
    return this.request(`/knowledge/${id}`, { method: 'DELETE' });
  }

  // Repos
  async listRepos() {
    return this.request('/repos');
  }

  async indexRepo(repoId) {
    return this.request(`/repos/${repoId}/index`, { method: 'POST' });
  }

  async getRepoSnippets(repoId, { lang, page, limit } = {}) {
    const params = new URLSearchParams();
    if (lang) params.set('lang', lang);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    return this.request(`/repos/${repoId}/snippets?${params}`);
  }

  async getRepoLanguages() {
    return this.request('/repos/languages');
  }
}

const api = new ApiClient();
export default api;