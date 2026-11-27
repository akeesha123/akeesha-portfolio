'use strict';
/* ===== EDIT YOUR CONTENT HERE ===== */
const CONFIG = {
  // Leave '' until you have the real link. Email: just the address.
  links: {
  email: 'akeeshaini490@gmail.com',
  github: 'https://github.com/akeesha123',
  linkedin: 'https://www.linkedin.com/in/akeesha-shaini-bb010036a/'
  
},
  titles: ['Computer Science Undergraduate', 'Aspiring Cloud Engineer', 'Software Developer in the Making'],
  // Skill format: ['Name', level]. level 0-100 shows a progress bar; leave it out to hide the fill. Use honest values only.
  skills: [
    { name: 'Programming', items: [['Python'], ['Java'], ['JavaScript'], ['C']] },
    { name: 'Web Development', items: [['HTML'], ['CSS'], ['JavaScript']] },
    { name: 'Database', items: [['MySQL'], ['PostgreSQL'], ['SQL']] },
    { name: 'Tools and Technologies', items: [['Git'], ['GitHub'], ['VS Code'], ['Unity']] },
    { name: 'Other Interests', items: [['Cloud Computing'], ['Software Testing'], ['Artificial Intelligence'], ['Machine Learning']] }
  ],
  // repo: add a real GitHub URL to show the GitHub button. image: e.g. 'images/projects/animotion.png'
  projects: [
    { title: 'AniMotion AR', image: '', repo: '', tech: ['Unity', 'C#', 'AR Foundation', 'ARCore'],
      desc: 'An Augmented Reality educational application designed to help students understand computer animation concepts through interactive 3D animations and learning activities.' },
    { title: 'UniFeed', image: '', repo: '', tech: ['Python', 'Django', 'PostgreSQL', 'Django Channels', 'Redis'],
      desc: 'A university social networking platform designed to connect students and support communication, information sharing and university-related interactions.' },
    { title: 'Student Spending Analysis', image: '', repo: '', tech: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-learn'],
      desc: 'A data analysis and machine learning project investigating factors influencing students\u2019 spending on computing devices.' }
  ]
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };

/* Toast */
let toastTimer;
function toast(msg, isError = false) {
  const t = $('#toast'); t.textContent = msg; t.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 4000);
}

/* Social, email and CV links come from CONFIG */
$$('[data-link]').forEach(a => {
  const key = a.dataset.link, v = CONFIG.links[key];
  if (v) {
    a.href = key === 'email' ? 'mailto:' + v : v;
    if (key !== 'email') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    if (key === 'cv') a.setAttribute('download', '');
    if (a.hasAttribute('data-show')) a.textContent = v.replace(/^https?:\/\//, '');
  } else {
    if (a.hasAttribute('data-show')) { a.textContent = 'Not added yet'; a.classList.add('unset'); }
    a.addEventListener('click', e => { e.preventDefault(); toast('Add your ' + key + ' link in js/script.js (CONFIG.links).', true); });
  }
});

/* Skills */
CONFIG.skills.forEach(cat => {
  const card = el('article', 'card reveal'); card.append(el('h3', '', cat.name));
  const ul = el('ul');
  cat.items.forEach(([name, level]) => {
    const li = el('li'), row = el('div', 'skill-row'); row.append(el('span', '', name));
    if (typeof level === 'number') row.append(el('span', 'muted', level + '%'));
    const track = el('div', 'track'), fill = el('div', 'fill');
    fill.style.setProperty('--lv', (typeof level === 'number' ? level : 0) + '%');
    track.append(fill); li.append(row, track); ul.append(li);
  });
  card.append(ul); $('#skill-grid').append(card);
});

/* Projects + details modal */
const modal = $('#modal'), mBody = $('#m-body');
function tagList(tech) { const ul = el('ul', 'tags'); tech.forEach(t => ul.append(el('li', '', t))); return ul; }
function projectActions(p, withDetails) {
  const box = el('div', 'p-actions');
  if (withDetails) { const b = el('button', 'btn primary', 'View Details'); b.type = 'button'; b.addEventListener('click', () => openModal(p)); box.append(b); }
  if (p.repo) { const g = el('a', 'btn ghost', 'GitHub'); g.href = p.repo; g.target = '_blank'; g.rel = 'noopener noreferrer'; box.append(g); }
  return box;
}
function openModal(p) {
  mBody.replaceChildren();
  const h = el('h3', '', p.title); h.id = 'm-title';
  mBody.append(h, el('p', 'muted', p.desc), tagList(p.tech), projectActions(p, false));
  modal.showModal();
}
$('.m-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
CONFIG.projects.forEach((p, i) => {
  const card = el('article', 'card project reveal'), thumb = el('div', 'thumb');
  if (p.image) { const img = el('img'); img.src = p.image; img.alt = p.title + ' screenshot'; img.loading = 'lazy'; thumb.append(img); }
  else thumb.textContent = String(i + 1).padStart(2, '0');
  const body = el('div', 'p-body'); body.append(el('h3', '', p.title), el('p', '', p.desc), tagList(p.tech), projectActions(p, true));
  card.append(thumb, body); $('#project-grid').append(card);
});

/* Navigation: mobile menu, active section, back to top */
const burger = $('.burger'), menu = $('#menu'), navLinks = $$('#menu a');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
navLinks.forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section').forEach(s => spy.observe(s));
const topBtn = $('#top');
addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 600), { passive: true });
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

/* Scroll reveal */
const reveal = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal').forEach(r => reduceMotion ? r.classList.add('in') : reveal.observe(r));

/* Typing animation */
(function typing() {
  const out = $('#typed');
  if (reduceMotion) { out.textContent = CONFIG.titles[0]; return; }
  let t = 0, c = 0, del = false;
  (function tick() {
    const word = CONFIG.titles[t];
    c += del ? -1 : 1; out.textContent = word.slice(0, c);
    let wait = del ? 35 : 70;
    if (!del && c === word.length) { del = true; wait = 1600; }
    else if (del && c === 0) { del = false; t = (t + 1) % CONFIG.titles.length; wait = 400; }
    setTimeout(tick, wait);
  })();
})();

/* Background particles */
(function particles() {
  if (reduceMotion) return;
  const cv = $('#bg'), ctx = cv.getContext('2d'); let w, h, pts = [], run = true;
  const size = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; pts = Array.from({ length: Math.min(50, Math.floor(w / 28)) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 })); };
  size(); addEventListener('resize', size);
  document.addEventListener('visibilitychange', () => { run = !document.hidden; if (run) draw(); });
  function draw() {
    if (!run) return; ctx.clearRect(0, 0, w, h);
    pts.forEach((p, i) => {
      p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
      ctx.fillStyle = 'rgba(0,229,255,.6)'; ctx.fillRect(p.x, p.y, 2, 2);
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
        if (d < 120) { ctx.strokeStyle = 'rgba(168,85,247,' + (.25 * (1 - d / 120)) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* Contact form: validate, then POST to PHP */
const form = $('#contact-form');
const rules = {
  full_name: v => v.length < 2 ? 'Please enter your full name.' : '',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.',
  subject: v => v.length < 3 ? 'Please enter a subject (at least 3 characters).' : '',
  message: v => v.length < 10 ? 'Please write a message (at least 10 characters).' : ''
};
function checkField(name) {
  const input = form.elements[name], msg = rules[name](input.value.trim()), box = input.closest('.field');
  box.classList.toggle('bad', !!msg); $('.err', box).textContent = msg; input.setAttribute('aria-invalid', !!msg); return !msg;
}
Object.keys(rules).forEach(n => form.elements[n].addEventListener('blur', () => checkField(n)));
form.addEventListener('submit', async e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(checkField).every(Boolean);
  if (!ok) { toast('Please fix the highlighted fields.', true); return; }
  const btn = $('button[type=submit]', form); btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const res = await fetch('backend/contact.php', { method: 'POST', body: new FormData(form) });
    const data = await res.json();
    if (data.success) { toast(data.message); form.reset(); }
    else {
      Object.entries(data.errors || {}).forEach(([k, m]) => { const f = form.elements[k]; if (f) { const b = f.closest('.field'); b.classList.add('bad'); $('.err', b).textContent = m; } });
      toast(data.message || 'Something went wrong.', true);
    }
  } catch { toast('Could not reach the server. Open the site through XAMPP (http://localhost/portfolio/).', true); }
  btn.disabled = false; btn.textContent = 'Send Message';
});
