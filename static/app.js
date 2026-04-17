const content = document.getElementById('content');
const settingsBtn = document.getElementById('settingsBtn');
const drawer = document.getElementById('drawer');
const closeDrawer = document.getElementById('closeDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const navButtons = [...document.querySelectorAll('[data-view]')];

let currentView = 'morning';
let cache = { morning: null, evening: null };

settingsBtn.addEventListener('click', openDrawer);
closeDrawer.addEventListener('click', closeDrawerPanel);
drawerBackdrop.addEventListener('click', closeDrawerPanel);

navButtons.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));

switchView('morning');

async function switchView(view) {
  currentView = view;
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  if (!cache[view]) {
    const res = await fetch(`/api/${view}`);
    cache[view] = await res.json();
  }
  renderList(cache[view], view);
}

function renderList(items, view) {
  const title = view === 'morning' ? 'Утренние азкары' : 'Вечерние азкары';
  const note = view === 'morning'
    ? 'Состав собран по структуре Azkar.ru и классическим утренним азкарам.'
    : 'Состав собран по структуре Azkar.ru и классическим вечерним азкарам.';

  if (!items || !items.length) {
    content.innerHTML = `<div class="empty-state">Нет данных</div>`;
    return;
  }

  content.innerHTML = `
    <section class="section-head">
      <div>
        <h2>${title}</h2>
        <p>${note}</p>
      </div>
      <div class="badge">${items.length} азкаров</div>
    </section>
    ${items.map(item => renderCard(item, view)).join('')}
  `;

  bindCounters();
}

function renderCard(item, view) {
  const key = storageKey(view, item.id);
  const count = Number(localStorage.getItem(key) || 0);
  const done = count >= item.repeat;
  return `
    <article class="azkar-card" data-key="${key}" data-repeat="${item.repeat}">
      <div class="azkar-meta">
        <div class="badge">${escapeHtml(item.title)}</div>
        <div class="source">${escapeHtml(item.source || '')}</div>
      </div>
      <div class="arabic">${escapeHtml(item.arabic)}</div>
      <div class="transcription-wrap">
        <div class="block-title">Русская транскрипция</div>
        <div class="transcription">${escapeHtml(item.transcription)}</div>
      </div>
      <div class="translation-wrap">
        <div class="block-title">Перевод</div>
        <div class="translation">${escapeHtml(item.translation)}</div>
      </div>
      <div class="counter">
        <div class="counter-status">
          <span>Повторы</span>
          <strong><span class="current-count">${count}</span> / ${item.repeat}</strong>
          <span class="${done ? 'done' : ''}">${done ? 'Выполнено' : 'Продолжай чтение'}</span>
        </div>
        <div class="counter-actions">
          <button class="counter-btn ghost reset-btn">Сброс</button>
          <button class="counter-btn plus-btn">+1</button>
        </div>
      </div>
    </article>
  `;
}

function bindCounters() {
  document.querySelectorAll('.azkar-card').forEach(card => {
    const key = card.dataset.key;
    const repeat = Number(card.dataset.repeat);
    const plusBtn = card.querySelector('.plus-btn');
    const resetBtn = card.querySelector('.reset-btn');
    const countEl = card.querySelector('.current-count');
    const stateEl = card.querySelector('.counter-status span:last-child');

    plusBtn.addEventListener('click', () => {
      const next = Math.min(Number(localStorage.getItem(key) || 0) + 1, repeat);
      localStorage.setItem(key, String(next));
      countEl.textContent = String(next);
      if (next >= repeat) {
        stateEl.textContent = 'Выполнено';
        stateEl.classList.add('done');
      }
    });

    resetBtn.addEventListener('click', () => {
      localStorage.setItem(key, '0');
      countEl.textContent = '0';
      stateEl.textContent = 'Продолжай чтение';
      stateEl.classList.remove('done');
    });
  });
}

function storageKey(view, id) {
  return `nurazkar:${view}:${id}`;
}

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawerPanel() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}
