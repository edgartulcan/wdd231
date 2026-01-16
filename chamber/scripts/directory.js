
/* js/directory.js */

// Toggle de menú móvil
const toggleBtn = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
if (toggleBtn && siteNav) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// Fechas del footer
const yearEl = document.getElementById('year');
const lastmodEl = document.getElementById('lastmod');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastmodEl) {
  const last = document.lastModified; // cadena legible
  lastmodEl.textContent = last;
  // opcional: atributo datetime ISO
  lastmodEl.setAttribute('datetime', new Date(document.lastModified).toISOString());
}

// Referencias
const membersEl = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

// Estado actual de la vista
let currentView = 'grid'; // 'grid' | 'list'
let membersData = [];

// Renderizadores
function renderGrid(members) {
  membersEl.classList.remove('members--list');
  membersEl.classList.add('members--grid');
  membersEl.innerHTML = members.map(m => `
    <article class="member-card ${m.membership_level === 3 ? 'member--gold' : m.membership_level === 2 ? 'member--silver' : ''}">
      <img class="member-card__img" loading="lazy" src="./images/companies/${m.image}" alt="Logo/Foto de ${m.name}" />
      <div class="member-card__body">
        <h3 class="member-card__name">${m.name}</h3>
        <p class="member-card__tag">${m.tagline ?? ''} <span class="badge">Nivel: ${labelLevel(m.membership_level)}</span></p>
        <div class="member-card__meta">
          <p><strong>Dirección:</strong> ${m.address}</p>
          <p><strong>Tel:</strong> ${m.phone}</p>
          <p><strong>Email:</strong> <a href="mailto:${m.email}">${m.email}</a></p>
        </div>
        <a class="member-card__link" href="${m.website}" target="_blank" rel="noopener">Visitar sitio</a>
      </div>
    </article>
  `).join('');
}

function renderList(members) {
  membersEl.classList.remove('members--grid');
  membersEl.classList.add('members--list');
  membersEl.innerHTML = members.map(m => `
    <div class="member-row ${m.membership_level === 3 ? 'member--gold' : m.membership_level === 2 ? 'member--silver' : ''}">
      <img class="member-row__img" loading="lazy" src="./images/companies/${m.image}" alt="Logo/Foto de ${m.name}" />
      <div class="member-row__name">${m.name} <span class="badge">Nivel: ${labelLevel(m.membership_level)}</span></div>
      <div class="member-row__contact">
        <div>${m.address}</div>
        <div>Tel: ${m.phone}</div>
        <div>Email: <a href="mailto:${m.email}">${m.email}</a></div>
      </div>
      <div class="member-row__website"><a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></div>
      <div class="member-row__actions"><a href="${m.website}" target="_blank" rel="noopener">Abrir</a></div>
    </div>
  `).join('');
}

function labelLevel(level) {
  switch (level) {
    case 3: return 'Oro';
    case 2: return 'Plata';
    default: return 'Miembro';
  }
}

// Alternar vista
function setView(view) {
  currentView = view;
  if (view === 'grid') {
    gridBtn?.setAttribute('aria-pressed', 'true');
    listBtn?.setAttribute('aria-pressed', 'false');
    renderGrid(membersData);
  } else {
    gridBtn?.setAttribute('aria-pressed', 'false');
    listBtn?.setAttribute('aria-pressed', 'true');
    renderList(membersData);
  }
}

gridBtn?.addEventListener('click', () => setView('grid'));
listBtn?.addEventListener('click', () => setView('list'));

// Cargar datos JSON
async function loadMembers() {
  try {
    const res = await fetch('./data/members.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // Orden sugerido: primero Oro, luego Plata, luego Miembro
    membersData = [...json].sort((a, b) => b.membership_level - a.membership_level);

    setView('grid'); // vista inicial
    membersEl?.setAttribute('aria-busy', 'false');
  } catch (err) {
    console.error('Error cargando members.json:', err);
    membersEl.innerHTML = `<p role="alert">No se pudo cargar el directorio. Intenta nuevamente más tarde.</p>`;
    membersEl?.setAttribute('aria-busy', 'false');
  }
}

loadMembers();
