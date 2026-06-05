import auth from './auth.js';
import api from './api.js';

// Simple hash-based router
const routes = {};

function route(path, handler) {
  routes[path] = handler;
}

async function navigate() {
  const hash = window.location.hash.slice(1) || '/login';
  const [path] = hash.split('?');

  const app = document.getElementById('app');

  if (!auth.isAuthenticated && !['/login', '/auth/callback'].includes(path)) {
    window.location.hash = '#/login';
    return;
  }

  // Find matching route (exact or with params)
  for (const [pattern, handler] of Object.entries(routes)) {
    const regex = new RegExp('^' + pattern.replace(/:\w+/g, '([^/]+)') + '$');
    const match = path.match(regex);
    if (match) {
      try {
        await handler(app, ...match.slice(1));
      } catch (err) {
        app.innerHTML = `<div class="error"><h2>Error</h2><p>${err.message}</p></div>`;
      }
      return;
    }
  }

  app.innerHTML = '<h2>404 — Page not found</h2>';
}

// ─── Routes ──────────────────────────────────────────────────────────

route('/login', (el) => {
  el.innerHTML = `
    <div class="login-page">
      <h1>🧠 Knowledge Manager</h1>
      <p>Search code and manage knowledge across your GitHub repositories.</p>
      <button id="github-login" class="btn btn-primary">Sign in with GitHub</button>
    </div>
  `;
  document.getElementById('github-login')?.addEventListener('click', () => auth.login());
});

route('/dashboard', async (el) => {
  const [repos, knowledge] = await Promise.all([
    api.listRepos(),
    api.listKnowledge({ limit: 5 }),
  ]);

  el.innerHTML = `
    <div class="dashboard">
      <section>
        <h2>Repositories (${repos.repos.length})</h2>
        <div class="repo-list">
          ${repos.repos.map(r => `
            <div class="card">
              <h3>${r.full_name}</h3>
              <p>${r.description || 'No description'}</p>
              <span class="badge">${r.language || 'Unknown'}</span>
              <span class="meta">Indexed: ${r.last_indexed_at ? new Date(r.last_indexed_at).toLocaleDateString() : 'Never'}</span>
            </div>
          `).join('')}
        </div>
      </section>
      <section>
        <h2>Recent Knowledge</h2>
        <div class="knowledge-list">
          ${knowledge.results.map(k => `
            <div class="card" onclick="location.hash='#/knowledge/${k.id}'">
              <h3>${k.title}</h3>
              <span class="badge">${k.entry_type}</span>
              <p>${k.content.slice(0, 150)}...</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
});

route('/search', async (el) => {
  el.innerHTML = `
    <div class="search-page">
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="Search code & knowledge..." autofocus>
        <select id="search-type"><option value="code">Code</option><option value="knowledge">Knowledge</option></select>
        <button id="search-btn" class="btn btn-primary">Search</button>
      </div>
      <div id="search-filters" class="filters">
        <select id="filter-lang"><option value="">All Languages</option></select>
        <select id="filter-repo"><option value="">All Repos</option></select>
      </div>
      <div id="search-results"></div>
    </div>
  `;

  // Populate filters
  try {
    const [langs, repos] = await Promise.all([api.getRepoLanguages(), api.listRepos()]);
    const langSelect = document.getElementById('filter-lang');
    langs.languages.forEach(l => { langSelect.innerHTML += `<option value="${l}">${l}</option>`; });
    const repoSelect = document.getElementById('filter-repo');
    repos.repos.forEach(r => { repoSelect.innerHTML += `<option value="${r.id}">${r.full_name}</option>`; });
  } catch {}

  document.getElementById('search-btn')?.addEventListener('click', performSearch);
  document.getElementById('search-input')?.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });
});

async function performSearch() {
  const query = document.getElementById('search-input').value;
  const type = document.getElementById('search-type').value;
  const lang = document.getElementById('filter-lang').value;
  const repo = document.getElementById('filter-repo').value;
  const resultsEl = document.getElementById('search-results');

  if (!query) return;
  resultsEl.innerHTML = '<p>Searching...</p>';

  try {
    const data = type === 'code'
      ? await api.searchCode(query, { lang, repo })
      : await api.searchKnowledge(query, { type: type === 'knowledge' ? undefined : type });

    if (data.results.length === 0) {
      resultsEl.innerHTML = '<p>No results found.</p>';
      return;
    }

    resultsEl.innerHTML = data.results.map(r => type === 'code' ? `
      <div class="result-card">
        <div class="result-header">
          <span class="badge">${r.language}</span>
          <span class="file-path">${r.repo_full_name}/${r.file_path}</span>
          <span class="meta">Lines ${r.line_start}-${r.line_end}</span>
        </div>
        <pre><code>${escapeHtml(r.content.slice(0, 500))}</code></pre>
      </div>
    ` : `
      <div class="result-card" onclick="location.hash='#/knowledge/${r.id}'">
        <h3>${r.title}</h3>
        <span class="badge">${r.entry_type}</span>
        <p>${r.content.slice(0, 200)}...</p>
        ${r.tags.length ? `<div class="tags">${r.tags.map(t => `<span class="tag">${t.name}</span>`).join('')}</div>` : ''}
      </div>
    `).join('');
  } catch (err) {
    resultsEl.innerHTML = `<p class="error">Search failed: ${err.message}</p>`;
  }
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ... more routes for /knowledge, /knowledge/:id, /repos, etc.

// ─── Init ────────────────────────────────────────────────────────────

window.addEventListener('hashchange', navigate);

auth.onAuthChange((user) => {
  const userInfo = document.getElementById('user-info');
  if (user) {
    userInfo.innerHTML = `<img src="${user.avatar_url}" width="24" height="24" alt=""> ${user.username} <button onclick="import('./auth.js').then(a => a.default.logout())" class="btn-small">Logout</button>`;
  } else {
    userInfo.innerHTML = '';
  }
});

// Handle SPA redirect from 404.html
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  history.replaceState(null, '', redirect);
}

await auth.init();
await navigate();