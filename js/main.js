'use strict';
/* Progressive enhancement: all pages, demos and downloads remain links without JS. */
document.documentElement.classList.replace('no-js', 'js');
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Mobile menu: explicit state, keyboard dismissal and focus restoration.
const menu = $('#site-nav');
const menuButton = $('#menu-toggle');
function closeMenu(restoreFocus = false) {
  if (!menu || !menuButton) return;
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  if (opening) $('a', menu)?.focus();
});
$$('a', menu || document.createElement('nav')).forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (menu?.classList.contains('open') && event.key === 'Escape') closeMenu(true);
  if (menu?.classList.contains('open') && event.key === 'Tab') {
    const targets = [menuButton, ...$$('a', menu)];
    const current = targets.indexOf(document.activeElement);
    if (current !== -1) {
      event.preventDefault();
      const next = (current + (event.shiftKey ? -1 : 1) + targets.length) % targets.length;
      targets[next].focus();
    }
  }
});
window.matchMedia('(min-width: 600px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Subtle viewport reveals; content defaults to visible if enhancement is unavailable.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.06 });
  $$('.reveal').forEach(element => observer.observe(element));
}
reducedMotion.addEventListener('change', event => {
  if (event.matches) document.body.classList.remove('motion-ready');
});

// Portrait: never overlay a fallback on a loaded photo. No substituted person.
$$('[data-portrait]').forEach(photo => {
  const placeholder = $('[data-portrait-placeholder]', photo.parentElement);
  const onLoad = () => { photo.hidden = false; if (placeholder) placeholder.hidden = true; };
  const onError = () => { photo.hidden = true; if (placeholder) placeholder.hidden = false; };
  photo.addEventListener('load', onLoad);
  photo.addEventListener('error', onError);
  if (photo.complete) photo.naturalWidth ? onLoad() : onError();
});

// Copy name with a selectable, accessible fallback for local file browsers.
$$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const value = button.dataset.copy;
  const feedback = $('#copy-feedback');
  try {
    await navigator.clipboard.writeText(value);
    if (feedback) feedback.textContent = 'Full name copied.';
  } catch {
    const name = $('#full-name');
    if (name) { const range = document.createRange(); range.selectNodeContents(name); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); }
    if (feedback) feedback.textContent = 'Name selected — press Ctrl+C or ⌘C to copy.';
  }
}));

// Search + category filters use the real static project cards as their data source.
const projectCards = $$('[data-project-card]');
let activeFilter = 'all';
const searchInput = $('#project-search');
function filterProjects() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let count = 0;
  projectCards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const searchMatch = !query || card.textContent.toLowerCase().includes(query);
    card.hidden = !(categoryMatch && searchMatch);
    if (!card.hidden) count++;
  });
  const counter = $('#project-count');
  if (counter) counter.textContent = `${count} of ${projectCards.length} projects${query ? ' matching your search' : ''}`;
  const empty = $('#empty-projects');
  if (empty) empty.hidden = count > 0;
}
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  $$('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  filterProjects();
}));
searchInput?.addEventListener('input', filterProjects);
$('#reset-search')?.addEventListener('click', () => {
  activeFilter = 'all';
  if (searchInput) searchInput.value = '';
  $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  filterProjects(); searchInput?.focus();
});
if (projectCards.length) filterProjects();

// Native dialog provides focus containment, Escape handling and accessible labels.
const projectDialog = $('#project-dialog');
let dialogTrigger;
$$('[data-preview]').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('[data-project-card]');
  if (!card || !projectDialog?.showModal) { const link = card && $('[data-demo-link]', card); if (link) window.location.href = link.href; return; }
  dialogTrigger = button;
  const cover = $('img', card);
  const dialogImage = $('#dialog-image');
  dialogImage.src = cover.src; dialogImage.alt = cover.alt;
  $('#dialog-title').textContent = $('h3', card).textContent;
  $('#dialog-category').textContent = $('.project-meta .label', card).textContent;
  $('#dialog-description').textContent = $('[data-description]', card).textContent;
  $('#dialog-detail').textContent = card.dataset.detail;
  $('#dialog-demo').href = $('[data-demo-link]', card).href;
  $('#dialog-download').href = $('[data-source-link]', card).href;
  projectDialog.showModal();
}));
$('#dialog-close')?.addEventListener('click', () => projectDialog.close());
projectDialog?.addEventListener('click', event => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close();
});
projectDialog?.addEventListener('close', () => dialogTrigger?.focus());

// A small CSS laboratory: direct, visible feedback from three genuine CSS values.
const sample = $('#playground-sample');
function updatePlayground() {
  if (!sample) return;
  const radius = $('#radius-control').value;
  const gap = $('#gap-control').value;
  const align = $('#align-control').value;
  sample.style.setProperty('--sample-radius', `${radius}px`);
  sample.style.setProperty('--sample-gap', `${gap}px`);
  sample.style.setProperty('--sample-align', align);
  $('#radius-value').value = `${radius}px`;
  $('#gap-value').value = `${gap}px`;
  $('#playground-code').textContent = `.card { border-radius: ${radius}px; gap: ${gap}px; text-align: ${align}; }`;
}
$$('[data-playground-control]').forEach(input => input.addEventListener('input', updatePlayground));
$('#reset-playground')?.addEventListener('click', () => {
  $('#radius-control').value = '8'; $('#gap-control').value = '16'; $('#align-control').value = 'left'; updatePlayground();
});
updatePlayground();

const backTop = $('#back-top');
function updateBackTop() { if (backTop) backTop.hidden = window.scrollY < 600; }
window.addEventListener('scroll', updateBackTop, { passive: true });
backTop?.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }); $('#page-top')?.focus({ preventScroll: true }); });
updateBackTop();
