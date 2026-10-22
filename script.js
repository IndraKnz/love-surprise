/* =========================================================
   OUR LITTLE STORY — script.js
   Semua yang bisa dipersonalisasi ada di CONFIG di bawah ini.
   ========================================================= */

/* =========================================================
   1. KONFIGURASI — UBAH BAGIAN INI SAJA
   ========================================================= */
const CONFIG = {

  /* --- Identitas --- */
  partnerName: "Eunike Dina Awola",          // nama pacar / penerima
  senderName: "Veela",              // nama kamu

  /* --- Tanggal (format: YYYY-MM-DD) --- */
  birthday: "2003-10-23",         // ulang tahun pasangan
  relationshipStart: "2023-12-08",// hari pertama jadian

  /* --- Warna tema (boleh diganti) --- */
  theme: {
    burgundy: "#3a0a1e",
    magenta: "#c2185b",
    pink: "#ffd0dd",
    cream: "#fff7ec",
    gold: "#e6c07b"
  },

  /* --- Isi surat cinta ---
     Pisahkan paragraf dengan satu baris kosong. */
  letter: `Happy birthday, perempuan kesayanganku. ❤️
Terima kasih sudah menjadi bagian dari hidupku selama ini. Terima kasih karena tetap menjadi dirimu sendiri, dengan segala kelebihan dan kekuranganmu.

Aku mungkin bukan orang yang selalu bisa mengungkapkan perasaanku dengan kata-kata yang indah. Kadang aku juga masih punya banyak kekurangan yang mungkin membuatmu kecewa. Tapi satu hal yang ingin aku usahakan adalah menjadi seseorang yang bisa terus belajar, tumbuh, dan mencintaimu dengan lebih baik.

Di hari ulang tahunmu ini, aku berharap dunia memperlakukanmu dengan lembut. Semoga langkahmu selalu dimudahkan, impianmu satu per satu terwujud, dan kamu selalu punya alasan untuk tersenyum.

Kalau suatu hari nanti kamu merasa lelah, semoga kamu ingat bahwa kamu nggak harus selalu kuat. Kamu juga berhak beristirahat, bercerita, dan disayangi.

Aku nggak bisa menjanjikan bahwa semua hari kita akan selalu indah. Tapi aku berharap kita selalu punya alasan untuk saling memahami, memperbaiki, dan berjalan bersama.

Selamat bertambah usia, rumah yang kutemukan dalam wujud seseorang. Semoga aku masih diberi banyak kesempatan untuk merayakan hari-hari bahagiamu.`,

  /* --- Foto kenangan ---
     Ganti "src" dengan fotomu: taruh di assets/images/ lalu tulis namanya.
     Contoh: { src: "assets/images/kita-1.jpg", date: "14 Feb 2023", caption: "Hari pertama" }
     "date" boleh dikosongkan. */
  photos: [
    { src: "assets/images/memory-6.jpeg", date: "", caption: "our golden hour" },
    { src: "assets/images/memory-7.jpeg", date: "", caption: "a rose for you" },
    { src: "assets/images/memory-3.jpeg", date: "", caption: "midnight talks" },
    { src: "assets/images/memory-4.jpeg", date: "", caption: "somewhere by the sea" },
    { src: "assets/images/memory-5.jpeg", date: "", caption: "little things" }
  ],

  /* --- Timeline perjalanan --- */
  timeline: [
    {
      year: "Awal",
      title: "Pertama kita bertemu",
      text: "Aku nggak pernah menyangka bahwa pertemuan sederhana bisa menjadi awal dari cerita sepanjang ini. Dari sekian banyak orang yang hadir dalam hidupku, ternyata kamu menjadi seseorang yang begitu berarti."
    },
    {
      year: "Kenangan",
      title: "Momen favorit kita",
      text: "Bagiku, kenangan terbaik bukan selalu tentang tempat yang kita kunjungi, tetapi tentang hal-hal sederhana saat bersamamu. Tawa, cerita, dan waktu yang kita habiskan bersama adalah hal-hal kecil yang selalu ingin aku ulangi."
    },
    {
      year: "Hari ini",
      title: "Masih memilih kamu",
      text: "Tiga tahun lebih kita bersama, melewati banyak cerita dan belajar memahami satu sama lain. Kita mungkin nggak selalu sempurna, tapi aku bersyukur masih bisa berjalan bersamamu. Sampai hari ini, aku masih ingin kamu menjadi bagian dari hari-hari yang akan datang."
    },
    {
      year: "Nanti",
      title: "Semua yang belum kita jalani",
      text: "Aku nggak tahu apa yang menunggu kita di masa depan, tapi aku berharap kita bisa terus tumbuh bersama, meraih mimpi, dan melewati setiap tantangan. Semoga suatu hari nanti, kita bisa melihat perjalanan ini sambil tersenyum dan bersyukur karena memilih untuk tetap bersama."
    }
  ],

  /* --- Musik (berkas lokal, bebas royalti) ---
     Ganti dengan lagu kalian: taruh di assets/music/ lalu tulis namanya. */
  music: {
    src: "assets/music/our-song.wav",
    title: "Little Piano for You",
    artist: "Untuk kamu ♡",
    cover: "assets/images/album-cover.svg"
  },

  /* --- Pesan di kotak hadiah --- */
  gift: {
    message: "Di dalam kotak ini bukan barang — tapi satu hal yang tidak bisa dibungkus: aku, yang akan selalu memilih kamu, setiap hari. ♡"
  },

  /* --- Penutup --- */
  final: {
    quote: "You are my favorite part of every story.",
    message: "Terima kasih sudah lahir, dan terima kasih sudah memilih untuk tetap di sini. Semoga tahun ini penuh hal-hal lembut yang kamu pantas dapatkan."
  }
};

/* =========================================================
   2. UTILITAS
   ========================================================= */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[(Math.random() * arr.length) | 0];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = String(str).split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function formatDate(date, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!date) return '—';
  try { return date.toLocaleDateString('id-ID', opts); }
  catch (e) { return date.toDateString(); }
}
function toast(msg, ms = 4200) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('is-on'), ms);
}

/* =========================================================
   3. TERAPKAN KONFIGURASI KE HALAMAN
   ========================================================= */
function applyConfig() {
  $$('[data-bind="partner"]').forEach(el => { el.textContent = CONFIG.partnerName; });
  $$('[data-bind="sender"]').forEach(el => { el.textContent = CONFIG.senderName; });

  const bday = parseDate(CONFIG.birthday);
  $$('[data-bind="birthday"]').forEach(el => { el.textContent = formatDate(bday); });

  const start = parseDate(CONFIG.relationshipStart);
  $$('[data-bind="startDate"]').forEach(el => { el.textContent = formatDate(start); });

  $$('[data-bind="today"]').forEach(el => { el.textContent = formatDate(new Date()); });

  /* tema */
  const t = CONFIG.theme || {};
  const root = document.documentElement.style;
  if (t.burgundy) root.setProperty('--burgundy', t.burgundy);
  if (t.magenta) { root.setProperty('--magenta', t.magenta); root.setProperty('--magenta-bright', t.magenta); }
  if (t.pink) root.setProperty('--pink', t.pink);
  if (t.cream) root.setProperty('--cream', t.cream);
  if (t.gold) root.setProperty('--gold', t.gold);

  /* musik */
  const audio = $('#audio');
  const src = audio.querySelector('source');
  if (CONFIG.music.src && src && src.getAttribute('src') !== CONFIG.music.src) {
    src.setAttribute('src', CONFIG.music.src);
    /* hint MIME lama tidak berlaku untuk berkas baru (.mp3/.m4a/.ogg) */
    src.removeAttribute('type');
    audio.load();
  }
  $('#track-title').textContent = CONFIG.music.title;
  $('#track-artist').textContent = CONFIG.music.artist;
  if (CONFIG.music.cover) $('#track-cover').src = CONFIG.music.cover;

  /* pesan hadiah & penutup */
  $('#gift-message-text').textContent = CONFIG.gift.message;
  $('.final__quote').textContent = CONFIG.final.quote;

  const bdayLabel = bday ? formatDate(bday, { day: 'numeric', month: 'long' }) : '';
  $('#final-sub').textContent = (bdayLabel ? bdayLabel + ' — ' : '') + CONFIG.final.message;

  /* judul dokumen */
  document.title = `For ${CONFIG.partnerName} ♡`;
}

/* =========================================================
   4. LATAR: KELIP & KELOPAK
   ========================================================= */
function buildSparkles() {
  const wrap = $('#sparkles');
  if (!wrap || reduceMotion) return;
  const n = window.innerWidth < 640 ? 16 : 30;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.style.left = rand(0, 100).toFixed(2) + '%';
    s.style.top = rand(0, 100).toFixed(2) + '%';
    s.style.animationDelay = rand(0, 5).toFixed(2) + 's';
    s.style.animationDuration = rand(3.6, 7).toFixed(2) + 's';
    s.style.transform = `scale(${rand(.6, 1.5).toFixed(2)})`;
    frag.appendChild(s);
  }
  wrap.appendChild(frag);
}

const Petals = (() => {
  const canvas = $('#fx-petals');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let W = 0, H = 0, dpr = 1, raf = 0, running = false;
  const items = [];
  const COLORS = ['#ffb3cd', '#ff8fb4', '#e0567f', '#ffd9e4', '#d81b60', '#ffc9d8'];

  function resize() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makePetal() {
    const size = rand(0.45, 0.95);
    return {
      kind: 'petal',
      x: rand(0, W),
      y: rand(-H * 0.2, H),
      size,
      rot: rand(0, Math.PI * 2),
      spin: rand(-0.012, 0.012),
      vx: rand(-0.25, 0.55),
      vy: rand(0.25, 0.85),
      sway: rand(0, Math.PI * 2),
      swaySpeed: rand(0.006, 0.018),
      alpha: rand(0.28, 0.6),
      color: pick(COLORS),
      life: 1,
      decay: 0
    };
  }

  function heartPath(c, s) {
    c.beginPath();
    c.moveTo(0, s * 0.38);
    c.bezierCurveTo(-s, -s * 0.3, -s * 0.52, -s * 1.02, 0, -s * 0.55);
    c.bezierCurveTo(s * 0.52, -s * 1.02, s, -s * 0.3, 0, s * 0.38);
    c.closePath();
  }

  function draw(it) {
    ctx.save();
    ctx.globalAlpha = it.alpha * it.life;
    ctx.translate(it.x, it.y);
    ctx.rotate(it.rot);
    if (it.kind === 'heart') {
      ctx.scale(it.size * 0.55, it.size * 0.55);
      heartPath(ctx, 10);
      ctx.fillStyle = it.color;
      ctx.shadowColor = 'rgba(255,140,180,.85)';
      ctx.shadowBlur = 12;
      ctx.fill();
    } else {
      ctx.scale(it.size, it.size * 0.7);
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.bezierCurveTo(9, -6, 9, 6, 0, 10);
      ctx.bezierCurveTo(-9, 6, -9, -6, 0, -10);
      ctx.fillStyle = it.color;
      ctx.fill();
      ctx.globalAlpha = it.alpha * it.life * 0.35;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.bezierCurveTo(4, -5, 4, 2, 0, 6);
      ctx.fillStyle = '#fff6fa';
      ctx.fill();
    }
    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      if (it.kind === 'heart') {
        it.x += it.vx; it.y += it.vy;
        it.vy += 0.012; it.vx *= 0.995;
        it.life -= it.decay;
        it.rot += it.spin;
        if (it.life <= 0 || it.y > H + 60) items.splice(i, 1);
      } else {
        it.sway += it.swaySpeed;
        it.x += it.vx + Math.sin(it.sway) * 0.5;
        it.y += it.vy;
        it.rot += it.spin;
        if (it.y > H + 40) { it.y = -30; it.x = rand(0, W); }
        if (it.x > W + 40) it.x = -30;
        if (it.x < -40) it.x = W + 30;
      }
      draw(it);
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!canvas || reduceMotion || running) return;
    resize();
    const n = window.innerWidth < 640 ? 12 : 22;
    for (let i = 0; i < n; i++) items.push(makePetal());
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function burst(x, y, count = 24) {
    if (!canvas) return;
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      items.push({
        kind: 'heart',
        x, y,
        size: rand(2.6, 5.2),
        rot: rand(-0.3, 0.3),
        spin: rand(-0.03, 0.03),
        vx: rand(-3.4, 3.4),
        vy: rand(-6.4, -2.2),
        alpha: rand(0.65, 1),
        color: pick(['#ff8fb4', '#ff5c8a', '#ffd0dd', '#ffffff']),
        life: 1,
        decay: rand(0.008, 0.016)
      });
    }
  }

  window.addEventListener('resize', () => { if (running) resize(); });

  return { start, burst, resize };
})();

/* =========================================================
   5. NAVIGASI ANTARLAYAR
   ========================================================= */
const ROUTES = ['s-envelope', 's-choose', 's-letter', 's-memories', 's-time', 's-music', 's-gift', 's-final'];
let current = 's-envelope';
let envToken = 0;

function navigate(id, push = true) {
  if (!ROUTES.includes(id)) return;
  if (id === current) { onEnter(id); return; }

  const prev = document.getElementById(current);
  if (prev) prev.classList.remove('is-active');

  current = id;
  const next = document.getElementById(id);
  if (!next) return;
  next.classList.add('is-active');
  next.scrollTop = 0;

  if (push && location.hash.slice(1) !== id.slice(2)) {
    history.pushState({ screen: id }, '', '#' + id.slice(2));
  }

  updateDock();
  onEnter(id);
}

function onEnter(id) {
  if (id !== 's-envelope') Petals.start();

  if (id === 's-envelope') {
    envToken++;
    $('#envelope').classList.remove('is-open');
    const wrap = document.querySelector('.env-wrap');
    if (wrap) wrap.classList.remove('is-opening');
  }
  if (id === 's-letter') startTyping();
  if (id === 's-time') { animateCounter(); animateTimeline(); }
  if (id === 's-gift') { resetGift(); setTimeout(openGift, 520); }
  if (id === 's-final') { startFinal(); }
  else { stopFireworks(); }
}

function updateDock() {
  const dock = $('#dock');
  const back = $('#btn-back');
  const screen = document.getElementById(current);
  const backTo = screen ? screen.dataset.back : '';

  dock.classList.toggle('is-visible', current !== 's-envelope');
  back.style.display = backTo ? '' : 'none';
  back.dataset.to = backTo || '';
}

function goBack() {
  const screen = document.getElementById(current);
  const to = screen && screen.dataset.back;
  if (to) navigate(to);
}

/* =========================================================
   6. HALAMAN AMPLOP
   ========================================================= */
function initEnvelope() {
  const btn = $('#envelope');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (btn.classList.contains('is-open')) return;

    const token = ++envToken;
    btn.classList.add('is-open');
    const wrap = btn.closest('.env-wrap');
    if (wrap) wrap.classList.add('is-opening');

    const r = btn.getBoundingClientRect();
    Petals.burst(r.left + r.width / 2, r.top + r.height * 0.45, 30);

    tryStartMusic();

    setTimeout(() => {
      if (token !== envToken) return;
      const shell = btn.getBoundingClientRect();
      Petals.burst(shell.left + shell.width / 2, shell.top + shell.height * 0.3, 18);
      navigate('s-choose');
    }, 1450);
  });
}

/* =========================================================
   7. KARTU KEJUTAN
   ========================================================= */
function initSurprises() {
  $$('.surprise').forEach(card => {
    const target = card.dataset.go;

    card.addEventListener('click', () => {
      const obj = $('.surprise__obj', card);

      if (obj.classList.contains('surprise__obj--cam')) {
        const flash = $('#flash');
        flash.classList.remove('is-on');
        void flash.offsetWidth;
        flash.classList.add('is-on');
        card.classList.add('is-flash');
        setTimeout(() => card.classList.remove('is-flash'), 620);
        setTimeout(() => navigate(target), 480);
        return;
      }

      if (obj.classList.contains('surprise__obj--glass')) {
        card.classList.add('is-flip');
        setTimeout(() => navigate(target), 620);
        return;
      }

      if (obj.classList.contains('surprise__obj--vinyl')) {
        card.classList.add('is-spin');
        setTimeout(() => navigate(target), 560);
        return;
      }

      navigate(target);
    });
  });
}

/* =========================================================
   8. SURAT CINTA + EFEK MENGETIK
   ========================================================= */
let letterEls = [];
let typeTimer = null;
let typedDone = false;

function buildLetter() {
  const body = $('#letter-body');
  if (!body) return;
  body.innerHTML = '';
  letterEls = CONFIG.letter
    .split(/\n{2,}/)
    .map(t => t.trim())
    .filter(Boolean)
    .map(text => {
      const p = document.createElement('p');
      const span = document.createElement('span');
      span.className = 'letter__typed';
      p.appendChild(span);
      body.appendChild(p);
      return { span, text, i: 0 };
    });
  typedDone = false;
}

function startTyping() {
  if (!letterEls.length) buildLetter();
  if (typedDone) { revealAll(false); return; }

  letterEls.forEach(el => { el.i = 0; el.span.textContent = ''; });
  clearTimeout(typeTimer);

  let pi = 0;
  const step = () => {
    if (current !== 's-letter') return;
    if (pi >= letterEls.length) { finishTyping(); return; }

    const cur = letterEls[pi];
    cur.span.classList.add('is-typing');
    cur.i = Math.min(cur.text.length, cur.i + 2);
    cur.span.textContent = cur.text.slice(0, cur.i);

    if (cur.i >= cur.text.length) {
      cur.span.classList.remove('is-typing');
      pi++;
      typeTimer = setTimeout(step, 380);
      return;
    }
    const ch = cur.text[cur.i - 1];
    const pause = /[.!?]/.test(ch) ? 120 : /[,;:]/.test(ch) ? 70 : 15;
    typeTimer = setTimeout(step, pause);
  };
  step();
}

function finishTyping() {
  clearTimeout(typeTimer);
  revealAll(true);
}

function revealAll(markDone = true) {
  clearTimeout(typeTimer);
  letterEls.forEach(el => {
    el.i = el.text.length;
    el.span.textContent = el.text;
    el.span.classList.remove('is-typing');
  });
  if (markDone) typedDone = true;
}

function initLetter() {
  buildLetter();
  const skip = $('#btn-skip-typing');
  if (skip) {
    skip.addEventListener('click', () => {
      revealAll(true);
      skip.textContent = 'Semua tulisan sudah tampil ♡';
      skip.disabled = true;
      skip.style.opacity = '.55';
      skip.style.cursor = 'default';
    });
  }
  const toFinal = $('#btn-to-final');
  if (toFinal) toFinal.addEventListener('click', () => navigate('s-final'));
}

/* =========================================================
   9. GALERI POLAROID + LIGHTBOX
   ========================================================= */
let lbIndex = 0;
let lbLastFocus = null;

function buildGallery() {
  const wrap = $('#scrapbook');
  if (!wrap) return;
  wrap.innerHTML = '';

  CONFIG.photos.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'polaroid';
    btn.setAttribute('aria-label', `Perbesar foto: ${p.caption || 'kenangan ' + (i + 1)}`);

    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.caption || `Kenangan ${i + 1}`;
    img.loading = 'lazy';

    const date = document.createElement('span');
    date.className = 'polaroid__date';
    date.textContent = p.date || '♡';

    const cap = document.createElement('span');
    cap.className = 'polaroid__cap';
    cap.textContent = p.caption || '';

    btn.append(img, date, cap);
    btn.addEventListener('click', () => openLightbox(i));
    wrap.appendChild(btn);
  });
}

function openLightbox(i) {
  const box = $('#lightbox');
  if (!box) return;
  lbLastFocus = document.activeElement;
  lbIndex = i;
  renderLightbox();
  box.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#lightbox .lightbox__close').focus();
}

function renderLightbox() {
  const p = CONFIG.photos[lbIndex];
  if (!p) return;
  const img = $('#lightbox-img');
  img.src = p.src;
  img.alt = p.caption || `Kenangan ${lbIndex + 1}`;
  $('#lightbox-date').textContent = p.date || '';
  $('#lightbox-date').style.display = p.date ? '' : 'none';
  $('#lb-cap').textContent = p.caption || '';
}

function stepLightbox(dir) {
  const n = CONFIG.photos.length;
  if (!n) return;
  lbIndex = (lbIndex + dir + n) % n;
  renderLightbox();
}

function closeLightbox() {
  const box = $('#lightbox');
  if (!box || box.hidden) return;
  box.hidden = true;
  document.body.style.overflow = '';
  if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
}

function initLightbox() {
  const box = $('#lightbox');
  if (!box) return;
  $$('[data-close]', box).forEach(el => el.addEventListener('click', closeLightbox));
  $('#lb-prev').addEventListener('click', () => stepLightbox(-1));
  $('#lb-next').addEventListener('click', () => stepLightbox(1));

  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepLightbox(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); stepLightbox(1); }
  });
}

/* =========================================================
   10. WAKTU & TIMELINE
   ========================================================= */
let daysTogether = 0;

function computeDays() {
  const start = parseDate(CONFIG.relationshipStart);
  if (!start) return 0;
  const now = new Date();
  const a = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const b = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((b - a) / 86400000));
}

function animateCounter() {
  daysTogether = computeDays();
  const el = $('#days-count');
  const extra = $('#counter-extra');
  if (!el) return;

  const months = Math.floor(daysTogether / 30.44);
  const years = Math.floor(months / 12);
  const restMonths = months % 12;
  if (extra) {
    extra.textContent = years > 0
      ? `≈ ${years} tahun ${restMonths} bulan`
      : `≈ ${months} bulan`;
  }

  if (reduceMotion) { el.textContent = daysTogether.toLocaleString('id-ID'); return; }

  const dur = 1500;
  const t0 = performance.now();
  const tick = now => {
    const p = clamp((now - t0) / dur, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(daysTogether * eased).toLocaleString('id-ID');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const glass = $('#big-glass');
  if (glass) {
    glass.classList.remove('is-flipping');
    void glass.offsetWidth;
    glass.classList.add('is-flipping');
  }
}

function buildTimeline() {
  const ol = $('#timeline');
  if (!ol) return;
  ol.innerHTML = '';
  CONFIG.timeline.forEach(item => {
    const li = document.createElement('li');
    li.className = 'timeline__item';

    const year = document.createElement('span');
    year.className = 'timeline__year';
    year.textContent = item.year || '';

    const title = document.createElement('h3');
    title.className = 'timeline__title';
    title.textContent = item.title || '';

    const text = document.createElement('p');
    text.className = 'timeline__text';
    text.textContent = item.text || '';

    li.append(year, title, text);
    ol.appendChild(li);
  });
}

function animateTimeline() {
  $$('.timeline__item').forEach((el, i) => {
    el.classList.remove('is-in');
    setTimeout(() => el.classList.add('is-in'), 140 + i * 160);
  });
}

/* =========================================================
   11. PEMUTAR MUSIK
   ========================================================= */
const audio = $('#audio');
let audioBroken = false;

function audioFileLabel() {
  if (!audio) return 'our-song.wav';
  const srcEl = audio.querySelector('source');
  const url = audio.currentSrc || audio.getAttribute('src')
    || (srcEl && srcEl.getAttribute('src')) || '';
  const name = url.split('/').pop().split('?')[0];
  return name || 'our-song.wav';
}

function audioErrorMessage() {
  const code = audio && audio.error ? audio.error.code : 0;
  const name = audioFileLabel();
  if (code === 3) return `Berkas ${name} rusak atau tidak bisa dibaca.`;
  if (code === 2) return `Gagal memuat ${name}. Tekan play lagi untuk mencoba ulang.`;
  return `Lagu "${name}" tidak bisa diputar. Pastikan berkasnya ada di assets/music/ dan berformat .mp3 atau .wav.`;
}

function retryAudio() {
  if (!audio) return false;
  audioBroken = false;
  const note = $('#player-note');
  if (note) note.textContent = 'Memuat ulang lagu…';
  audio.load();
  return true;
}

function buildEq() {
  const eq = $('#eq');
  if (!eq) return;
  const n = 30;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const bar = document.createElement('span');
    bar.style.animationDuration = rand(0.55, 1.15).toFixed(2) + 's';
    bar.style.animationDelay = rand(0, 0.9).toFixed(2) + 's';
    bar.style.setProperty('--h', rand(0.14, 0.55).toFixed(2));
    frag.appendChild(bar);
  }
  eq.appendChild(frag);
}

function setPlayingUI(playing) {
  const player = $('#player');
  if (player) player.classList.toggle('is-playing', playing);
  const dockBtn = $('#btn-music-toggle');
  if (dockBtn) dockBtn.setAttribute('aria-pressed', String(playing));
  const playBtn = $('#btn-play');
  if (playBtn) playBtn.setAttribute('aria-label', playing ? 'Jeda musik' : 'Putar musik');
  const note = $('#player-note');
  if (note) {
    note.textContent = playing
      ? 'Sedang diputar — biarkan lagu ini menemanimu ♡'
      : 'Musik berhenti. Tekan play untuk memutar lagi.';
  }
}

function playMusic() {
  if (audioBroken) retryAudio();
  const p = audio.play();
  if (p && p.catch) {
    p.then(() => setPlayingUI(true)).catch(err => {
      setPlayingUI(false);
      if (err && err.name === 'NotAllowedError') {
        toast('Browser memblokir pemutaran otomatis. Tekan tombol play untuk memulai musik.');
      } else if (audio && audio.error) {
        audioBroken = true;
        toast(audioErrorMessage());
      }
    });
  }
}

function tryStartMusic() {
  if (!audio) return;
  if (audioBroken) retryAudio();
  const vol = $('#volume');
  audio.volume = clamp(Number(vol && vol.value) || 0.7, 0, 1);
  const p = audio.play();
  if (p && p.catch) {
    p.then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
  }
}

function toggleMusic() {
  if (!audio) return;
  if (audio.paused) playMusic();
  else audio.pause();
}

function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function initPlayer() {
  buildEq();
  if (!audio) return;

  const playBtn = $('#btn-play');
  const seek = $('#seek');
  const vol = $('#volume');

  if (playBtn) playBtn.addEventListener('click', toggleMusic);

  const rewind = $('#btn-rewind');
  const forward = $('#btn-forward');
  if (rewind) rewind.addEventListener('click', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
  if (forward) forward.addEventListener('click', () => {
    if (isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration - 0.2, audio.currentTime + 10);
  });

  if (seek) {
    seek.addEventListener('input', () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
      }
    });
  }
  if (vol) {
    vol.addEventListener('input', () => { audio.volume = clamp(Number(vol.value), 0, 1); });
    audio.volume = clamp(Number(vol.value), 0, 1);
  }

  audio.addEventListener('play', () => setPlayingUI(true));
  audio.addEventListener('pause', () => setPlayingUI(false));
  audio.addEventListener('ended', () => setPlayingUI(false));

  audio.addEventListener('loadedmetadata', () => {
    $('#t-dur').textContent = fmtTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    $('#t-cur').textContent = fmtTime(audio.currentTime);
    if (isFinite(audio.duration) && audio.duration > 0 && seek) {
      seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    }
  });

  audio.addEventListener('error', () => {
    audioBroken = true;
    setPlayingUI(false);
    const note = $('#player-note');
    if (note) note.textContent = audioErrorMessage();
  });

  const dockToggle = $('#btn-music-toggle');
  if (dockToggle) dockToggle.addEventListener('click', toggleMusic);
}

/* =========================================================
   12. KOTAK HADIAH
   ========================================================= */
let giftOpened = false;

function resetGift() {
  giftOpened = false;
  const gift = $('#gift');
  const msg = $('#gift-message');
  const hint = $('#gift-hint');
  if (gift) { gift.classList.remove('is-open'); gift.setAttribute('aria-expanded', 'false'); }
  if (msg) { msg.hidden = true; msg.classList.remove('is-in'); }
  if (hint) hint.classList.remove('is-hidden');
}

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  const gift = $('#gift');
  const msg = $('#gift-message');
  const hint = $('#gift-hint');
  if (!gift) return;

  gift.classList.add('is-open');
  gift.setAttribute('aria-expanded', 'true');
  if (hint) hint.classList.add('is-hidden');

  const r = gift.getBoundingClientRect();
  Petals.burst(r.left + r.width / 2, r.top + r.height * 0.3, 34);
  setTimeout(() => Petals.burst(r.left + r.width / 2, r.top + r.height * 0.2, 18), 260);

  setTimeout(() => {
    if (!msg) return;
    msg.hidden = false;
    requestAnimationFrame(() => msg.classList.add('is-in'));
  }, 620);
}

function initGift() {
  const gift = $('#gift');
  if (gift) gift.addEventListener('click', openGift);

  const openBtn = $('#btn-open-gift');
  if (openBtn) openBtn.addEventListener('click', () => navigate('s-letter'));
}

/* =========================================================
   13. KEJUTAN TERAKHIR: KEMBANG API (CANVAS)
   ========================================================= */
const Fireworks = (() => {
  const canvas = $('#fx-fireworks');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let W = 0, H = 0, dpr = 1, raf = 0, running = false, timer = null, lastT = 0;
  let particles = [], rockets = [], flashes = [], acc = 0;
  const COLORS = ['#ff5c8a', '#ffd166', '#ffffff', '#ff9ec4', '#e6c07b', '#ffb3cd'];

  function resize() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function launch() {
    /* ledakan dijauhkan dari tengah layar supaya teks tetap nyaman dibaca */
    const left = Math.random() > 0.5;
    rockets.push({
      x: left ? rand(W * 0.06, W * 0.36) : rand(W * 0.64, W * 0.94),
      y: H + 10,
      vx: rand(-0.9, 0.9),
      vy: rand(-13.5, -9.5),
      targetY: rand(H * 0.12, H * 0.46),
      color: pick(COLORS),
      trail: []
    });
  }

  function explode(x, y, heart = false) {
    const color = pick(COLORS);
    flashes.push({ x, y, r: 4, life: 1, color });
    const count = heart ? 78 : 118;

    if (heart) {
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const s = rand(5.0, 6.4);
        particles.push({
          x, y, vx: hx * s, vy: hy * s,
          life: 1, decay: rand(0.007, 0.011),
          color: Math.random() > 0.45 ? '#ff8fb4' : color,
          size: rand(1.5, 2.6), spark: false
        });
      }
    } else {
      for (let i = 0; i < count; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.8, 6.4) * (Math.random() > 0.75 ? 1.35 : 1);
        particles.push({
          x, y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 1, decay: rand(0.007, 0.015),
          color: Math.random() > 0.82 ? '#ffffff' : color,
          size: rand(1.4, 2.8), spark: false
        });
      }
    }
  }

  /* satu langkah simulasi (60 langkah = 1 detik) */
  function update() {
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.16;
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 8) r.trail.shift();
      if (r.y <= r.targetY || r.vy >= -1.2) {
        explode(r.x, r.y, Math.random() > 0.62);
        rockets.splice(i, 1);
      }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.px = p.x; p.py = p.y;
      p.vy += 0.052;
      p.vx *= 0.988;
      p.vy *= 0.988;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) particles.splice(i, 1);
    }
    for (let i = flashes.length - 1; i >= 0; i--) {
      const f = flashes[i];
      f.r += 9;
      f.life -= 0.09;
      if (f.life <= 0) flashes.splice(i, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < rockets.length; i++) {
      const r = rockets[i];
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = r.color;
      ctx.shadowColor = r.color;
      ctx.shadowBlur = 16;
      ctx.fill();

      for (let j = 0; j < r.trail.length; j++) {
        const t = r.trail[j];
        ctx.globalAlpha = (j / r.trail.length) * 0.28;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    for (let i = 0; i < flashes.length; i++) {
      const f = flashes[i];
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      g.addColorStop(0, 'rgba(255,255,255,' + (f.life * 0.55).toFixed(3) + ')');
      g.addColorStop(0.35, f.color);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalAlpha = Math.max(0, f.life * 0.5);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const a = Math.max(0, p.life);
      ctx.globalAlpha = a;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.lineWidth = Math.max(0.7, p.size * a);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p.px || p.x, p.py || p.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * a * 0.7), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /* langkah tetap -> kecepatan konsisten walau perangkat lambat / 120Hz */
  function frame(now) {
    if (!running) return;
    if (!lastT) lastT = now;
    const elapsed = Math.min(now - lastT, 320);
    lastT = now;
    acc += elapsed;

    let guard = 0;
    while (acc >= 16.667 && guard < 22) {
      update();
      acc -= 16.667;
      guard++;
    }
    if (guard >= 22) acc = 0;

    draw();
    raf = requestAnimationFrame(frame);
  }

  function schedule() {
    if (!running) return;
    launch();
    if (Math.random() > 0.72) setTimeout(() => { if (running) launch(); }, 180);
    timer = setTimeout(schedule, rand(620, 1150));
  }

  function start() {
    if (!canvas || reduceMotion || running) return;
    resize();
    running = true;
    particles = []; rockets = []; flashes = []; lastT = 0; acc = 0;
    launch();
    setTimeout(() => running && launch(), 350);
    raf = requestAnimationFrame(frame);
    timer = setTimeout(schedule, 900);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(timer);
    particles = []; rockets = []; flashes = [];
    if (ctx) ctx.clearRect(0, 0, W, H);
  }

  window.addEventListener('resize', () => { if (running) resize(); });

  return { start, stop };
})();

function startFinal() {
  const dim = $('#dim');
  const fw = $('#fx-fireworks');
  if (dim) dim.classList.add('is-on');
  if (fw) fw.classList.add('is-on');

  if (reduceMotion) {
    if (dim) dim.classList.add('is-on');
    return;
  }
  Fireworks.start();

  const photo = $('.final__photo');
  if (photo) {
    const r = photo.getBoundingClientRect();
    setTimeout(() => Petals.burst(r.left + r.width / 2, r.top + r.height / 2, 16), 900);
  }
}

function stopFireworks() {
  const dim = $('#dim');
  const fw = $('#fx-fireworks');
  if (dim) dim.classList.remove('is-on');
  if (fw) fw.classList.remove('is-on');
  Fireworks.stop();
}

/* =========================================================
   14. REPLAY
   ========================================================= */
function initReplay() {
  const btn = $('#btn-replay');
  if (!btn) return;

  btn.addEventListener('click', () => {
    stopFireworks();
    typedDone = false;
    buildLetter();
    resetGift();

    const skip = $('#btn-skip-typing');
    if (skip) {
      skip.disabled = false;
      skip.style.opacity = '';
      skip.style.cursor = '';
      skip.textContent = 'Tampilkan semua tulisan';
    }

    if (audio) { audio.pause(); audio.currentTime = 0; }
    $('#t-cur').textContent = '0:00';
    $('#seek').value = '0';

    navigate('s-envelope');
  });
}

/* =========================================================
   15. INISIALISASI
   ========================================================= */
function initNav() {
  const back = $('#btn-back');
  if (back) back.addEventListener('click', goBack);

  window.addEventListener('popstate', () => {
    const id = 's-' + (location.hash.replace('#', '') || 'envelope');
    navigate(ROUTES.includes(id) ? id : 's-envelope', false);
  });
}

function initStartRoute() {
  const hash = location.hash.replace('#', '');
  const id = hash ? 's-' + hash : 's-envelope';
  if (ROUTES.includes(id) && id !== 's-envelope') {
    history.replaceState({ screen: id }, '', '#' + hash);
    ROUTES.forEach(r => {
      const s = document.getElementById(r);
      if (s) s.classList.remove('is-active');
    });
    current = id;
    const screen = document.getElementById(id);
    if (screen) screen.classList.add('is-active');
    updateDock();
    onEnter(id);
  } else {
    history.replaceState({ screen: 's-envelope' }, '', '#envelope');
    updateDock();
  }
}

function init() {
  applyConfig();
  buildSparkles();
  buildGallery();
  buildTimeline();
  initPlayer();
  initEnvelope();
  initSurprises();
  initLetter();
  initLightbox();
  initGift();
  initReplay();
  initNav();
  initStartRoute();

  Petals.start();
  Petals.resize();

  /* musik tidak diputar otomatis — menunggu gestur pengguna (klik amplop / tombol play) */
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
