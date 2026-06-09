/* ============================================================
   Muhammad Ramis — portfolio app logic (v2)
   Lens system · rendering · hash router (blog) · bug bounty
   · interactivity (spotlight/tilt/parallax) · animations
   ============================================================ */
(function () {
  'use strict';

  const DATA = window.DATA;
  const CONTENT = window.CONTENT;
  const POSTS = window.POSTS || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const byId = {};
  CONTENT.tracks.forEach(t => (byId[t.id] = t));

  /* ---------- overview pseudo-track ---------- */
  const firstPara = s => (s || '').split(/\n\s*\n/)[0];
  const dedupe = (arr) => { const seen = new Set(), out = []; arr.forEach(c => { if (!seen.has(c.url)) { seen.add(c.url); out.push(c); } }); return out; };
  const OVERVIEW = {
    id: 'overview', label: 'The full picture', short: 'Overview',
    tagline: CONTENT.overview.elevator,
    summary: firstPara(CONTENT.overview.about),
    stats: [
      { value: '51', label: 'Bug-bounty findings' },
      { value: 'OSCP+', label: 'Certified · OSED next' },
      { value: '8+', label: 'Years experience' },
      { value: '4', label: 'Disciplines, one operator' }
    ],
    focusAreas: DATA.lenses.map(l => `${l.label} — ${l.blurb}`),
    tools: DATA.marquee.slice(0, 14),
    contributions: dedupe(CONTENT.tracks.flatMap(t => t.contributions || [])).slice(0, 6)
  };
  const getTrack = id => (id === 'overview' ? OVERVIEW : byId[id]) || OVERVIEW;
  const lensMeta = id => DATA.lenses.find(l => l.id === id) || DATA.overviewLens;

  /* ---------- aggregate projects across lenses ---------- */
  const PROJECTS = [];
  (function () {
    const map = new Map();
    CONTENT.tracks.forEach(t => (t.projects || []).forEach(p => {
      const key = p.title.trim().toLowerCase();
      if (map.has(key)) map.get(key).lenses.push(t.id);
      else { const c = Object.assign({}, p, { lenses: [t.id] }); map.set(key, c); PROJECTS.push(c); }
    }));
  })();
  const projIcon = p => {
    const t = (p.tags || []).join(' ').toLowerCase() + ' ' + p.title.toLowerCase();
    const m = [
      [/ai|llm|bugtrace|agent|rag|model/, 'fa-robot'], [/bounty|bug/, 'fa-bug'], [/active.?directory|domain|kerber/, 'fa-network-wired'],
      [/gdpr|privacy|compliance/, 'fa-user-shield'], [/microservice|platform|backend|\.net|dotnet|kafka|spring/, 'fa-diagram-project'],
      [/harden|siem|zero.?trust|detection/, 'fa-server'], [/crypto|signature|quantum/, 'fa-key'],
      [/access|wcag|a11y|design.system/, 'fa-universal-access'], [/dashboard|portal|ui|ux/, 'fa-pen-ruler'],
      [/incident|forensic/, 'fa-triangle-exclamation'], [/anomaly|ml|detect/, 'fa-wave-square'], [/api|gateway/, 'fa-code'],
      [/real.?time|chat|stream|messag/, 'fa-comments'], [/ecommerce|e-commerce|payment|shop/, 'fa-cart-shopping'], [/mobile|react native/, 'fa-mobile-screen']
    ];
    for (const [re, ic] of m) if (re.test(t)) return ic;
    return lensMeta(p.lenses[0]).icon;
  };

  /* ============================================================
     THEME
     ============================================================ */
  (function () { const s = localStorage.getItem('ramis-theme'); if (s) root.setAttribute('data-theme', s); syncTheme(); })();
  function syncTheme() { const dark = root.getAttribute('data-theme') !== 'light'; $('#themeToggle').innerHTML = `<i class="fa-solid fa-${dark ? 'moon' : 'sun'}"></i>`; }
  $('#themeToggle').addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') !== 'light';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('ramis-theme', dark ? 'light' : 'dark'); syncTheme();
  });

  /* ============================================================
     LENS STATE
     ============================================================ */
  let currentLens = 'overview';
  function setLens(id, opts = {}) {
    currentLens = id;
    root.setAttribute('data-lens', id);
    renderHero(id); renderFocus(id); renderContributions(id); renderTerminal(id); updateLensSwitch(id);
    setProjectFilter(id === 'overview' ? 'all' : id, true);
    $('#heroCv').setAttribute('href', DATA.profile.cvByLens[id] || DATA.profile.cvByLens.overview);
    $('#footLens').textContent = getTrack(id).short;
    if (!opts.silent) flashLens();
  }
  function flashLens() { if (reduce) return; const f = $('#lensFlash'); f.classList.remove('run'); void f.offsetWidth; f.classList.add('run'); }

  /* ============================================================
     GATEWAY
     ============================================================ */
  function renderGateway() {
    const grid = $('#lensGrid');
    const cards = DATA.lenses.map((l, i) => `
      <button class="lens-card" data-lens-card="${l.id}" style="--i:${i};--lc:rgb(${l.rgb});--lc-rgb:${l.rgb}">
        <span class="lens-card__icon"><i class="fa-solid ${l.icon}"></i></span>
        <span class="lens-card__title">${l.label}</span>
        <span class="lens-card__desc">${l.blurb}</span>
        <span class="lens-card__go">Enter <i class="fa-solid fa-arrow-right"></i></span>
      </button>`).join('');
    const ov = DATA.overviewLens;
    const overviewCard = `
      <button class="lens-card is-overview" data-lens-card="overview" style="--i:${DATA.lenses.length};--lc:rgb(${ov.rgb});--lc-rgb:${ov.rgb}">
        <span class="lens-card__icon"><i class="fa-solid ${ov.icon}"></i></span>
        <span class="lens-card__body"><span class="lens-card__title">${ov.label}</span><span class="lens-card__desc">${ov.blurb}</span></span>
        <span class="lens-card__go">Enter <i class="fa-solid fa-arrow-right"></i></span>
      </button>`;
    grid.innerHTML = cards + overviewCard;
    $$('[data-lens-card]', grid).forEach(b => { b.addEventListener('click', () => enterSite(b.getAttribute('data-lens-card'))); attachTilt(b); });
    requestAnimationFrame(() => $('#gateway').classList.add('is-ready'));
    typeRoles();
  }
  function typeRoles() {
    const roles = (DATA.roles && DATA.roles.length ? DATA.roles : CONTENT.overview.heroTaglines) || ['Penetration Tester'];
    const eln = $('#gatewayRoles');
    if (reduce) { eln.textContent = 'Red + Blue security · engineer · AI/ML · UX'; return; }
    let ri = 0, ci = 0, del = false;
    (function tick() {
      const w = roles[ri];
      eln.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
      let wait = del ? 38 : 68;
      if (!del && ci > w.length) { del = true; wait = 1400; }
      else if (del && ci < 0) { del = false; ci = 0; ri = (ri + 1) % roles.length; wait = 250; }
      setTimeout(tick, wait);
    })();
  }

  let entered = false;
  function enterSite(lensId) {
    if (!entered) {
      entered = true;
      $('#gateway').classList.add('is-hidden');
      document.body.classList.remove('gateway-open');
      setTimeout(() => $('#gateway').setAttribute('hidden', ''), 800);
      $('#site').classList.add('is-live');
      $('#spotlight').classList.add('on');
    }
    setLens(lensId, { silent: true });
    startReveal();
  }
  $('#enterAll').addEventListener('click', e => { e.preventDefault(); enterSite('overview'); });

  /* ============================================================
     STATIC RENDER
     ============================================================ */
  function socialLinks(cls) {
    return DATA.profile.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" class="${cls || ''}"><i class="${s.icon}"></i></a>`).join('');
  }
  function renderStatic() {
    $('#year').textContent = '2026';
    $('#heroSocial').innerHTML = socialLinks();
    $('#footSocial').innerHTML = socialLinks();
    const items = DATA.marquee.map(m => `<span>${m}</span>`).join('');
    $('#marquee').innerHTML = items + items;
    const paras = CONTENT.overview.about.split(/\n\s*\n/);
    const rest = paras.slice(1).join('\n\n');
    $('#aboutProse').innerHTML = mdToHtml(paras[0]) + (rest ? `<div class="pmore" hidden>${mdToHtml(rest)}</div><button class="readmore" id="aboutMore" type="button">Read more <i class="fa-solid fa-chevron-down"></i></button>` : '');
    if (rest) $('#aboutMore').addEventListener('click', function () { const m = $('.pmore'); if (m.hasAttribute('hidden')) { m.removeAttribute('hidden'); this.innerHTML = 'Show less <i class="fa-solid fa-chevron-up"></i>'; } else { m.setAttribute('hidden', ''); this.innerHTML = 'Read more <i class="fa-solid fa-chevron-down"></i>'; } });
    $('#philosophy').innerHTML = CONTENT.overview.philosophy.map(p => `<div class="phi"><span class="phi__ic"><i class="fa-solid fa-${p.icon}"></i></span><div><h4>${p.title}</h4><p>${p.text}</p></div></div>`).join('');
    $('#aboutStats').innerHTML = OVERVIEW.stats.map(statCard).join('');
    renderProjectsOnce();
    renderBugBounty();
    renderTimeline();
    renderCredentials();
    renderBlogFilters();
    renderBlog('all');
    renderContact();
    renderLensSwitchMenu();
  }
  const statCard = s => `<div class="stat"><div class="stat__num" data-count="${s.value}">${s.value}</div><div class="stat__label">${s.label}</div></div>`;

  /* ---------- HERO ---------- */
  function renderHero(id) {
    const t = getTrack(id);
    $('#heroBadges').innerHTML = [
      `<span class="chip"><i class="fa-solid fa-location-dot"></i> ${DATA.profile.location}</span>`,
      `<span class="chip"><i class="fa-solid fa-circle-check"></i> ${DATA.profile.availability}</span>`,
      ...t.stats.slice(0, 2).map(s => `<span class="chip"><i class="fa-solid fa-bolt"></i> ${s.value} ${s.label}</span>`)
    ].join('');
    $('#heroSub').textContent = t.summary;
    typeInto($('#heroLensline'), t.tagline);
  }
  let typeTimer = null;
  function typeInto(node, text) {
    clearTimeout(typeTimer);
    if (reduce) { node.textContent = text; return; }
    let i = 0; node.textContent = '';
    (function step() { node.textContent = text.slice(0, i++); if (i <= text.length) typeTimer = setTimeout(step, 20); })();
  }

  /* ---------- FOCUS ---------- */
  function renderFocus(id) {
    const t = getTrack(id);
    $('#focusEyebrow').textContent = t.label;
    $('#focusTitle').innerHTML = id === 'overview' ? `Four lenses, <span class="grad">one engineer</span>` : `<span class="grad">${t.short}</span> — focus & toolkit`;
    $('#focusSub').textContent = t.summary;
    $('#focusAreas').innerHTML = `<h3><i class="fa-solid fa-crosshairs"></i> What I work on <span style="color:var(--text-faint);font-weight:400;font-size:.78rem">— tap to expand</span></h3>
      <div class="focus-tiles">${t.focusAreas.map(f => `<button class="ftile" type="button"><span class="ftile__top"><span class="ic"><i class="fa-solid ${focusIcon(f)}"></i></span><span class="ftile__lbl">${shortLabel(f)}</span><i class="fa-solid fa-chevron-down chev"></i></span><span class="ftile__full">${f}</span></button>`).join('')}</div>`;
    $$('#focusAreas .ftile').forEach(b => b.addEventListener('click', () => b.classList.toggle('open')));
    $('#focusTools').innerHTML = `<h3><i class="fa-solid fa-toolbox"></i> Tools & tech I reach for</h3><div class="tags">${t.tools.map(x => `<span class="tag">${x}</span>`).join('')}</div>`;
  }
  function shortLabel(s) {
    let base = s.split('(')[0].replace(/\s[—-]\s.*$/, '').trim();
    const parts = base.split(/,| and | & /);
    let lab = parts[0].trim();
    if (lab.length < 16 && parts[1]) lab += ', ' + parts[1].trim();
    lab = lab.replace(/\s+/g, ' ');
    if (lab.length > 40) lab = lab.slice(0, 38).replace(/[ ,]+$/, '') + '…';
    return lab;
  }
  function focusIcon(s) {
    const t = s.toLowerCase();
    const m = [[/exploit dev|binary|ghidra|reverse|osed|rop/, 'fa-microchip'], [/active.directory|kerber|lateral|cloud attack/, 'fa-network-wired'],
      [/detection|siem|suricata|ids|monitor/, 'fa-tower-broadcast'], [/sast|dast|ci\/cd|pipeline|automation/, 'fa-robot'],
      [/threat model|stride/, 'fa-diagram-project'], [/gdpr|privacy|pii|compliance/, 'fa-user-shield'],
      [/harden|cis|zero.trust|segment/, 'fa-server'], [/incident|forensic/, 'fa-triangle-exclamation'],
      [/ai|llm|prompt|model|agent/, 'fa-brain'], [/exploit|bola|idor|ssrf|injection|business.logic|race|bug/, 'fa-bug'],
      [/microservice|kafka|spring|api|grpc|rest/, 'fa-diagram-project'], [/real.time|websocket|stream/, 'fa-bolt'],
      [/observability|opentelemetry|prometheus|slo/, 'fa-chart-line'], [/data|postgres|redis|sql|mongo/, 'fa-database'],
      [/accessib|wcag|a11y/, 'fa-universal-access'], [/design system|component|ui|ux|dashboard|motion|figma|handoff/, 'fa-pen-ruler'],
      [/mlops|pytorch|embedding|vector|anomaly|model eval/, 'fa-wave-square'], [/secure sdlc|devsecops|review/, 'fa-code-branch']];
    for (const [re, ic] of m) if (re.test(t)) return ic;
    return 'fa-angle-right';
  }

  /* ---------- PROJECTS ---------- */
  function renderProjectsOnce() {
    const filters = [{ id: 'all', label: 'All', icon: 'fa-layer-group' }, ...DATA.lenses.map(l => ({ id: l.id, label: l.short, icon: l.icon }))];
    $('#projectFilters').innerHTML = filters.map(f => `<button class="filter" data-filter="${f.id}"><i class="fa-solid ${f.icon}"></i> ${f.label}</button>`).join('');
    $$('#projectFilters .filter').forEach(b => b.addEventListener('click', () => setProjectFilter(b.getAttribute('data-filter'))));
    $('#projectGrid').innerHTML = PROJECTS.map((p, idx) => {
      const stack = p.stack || [];
      const chips = stack.slice(0, 4).map(s => `<span>${s}</span>`).join('') + (stack.length > 4 ? `<span class="more">+${stack.length - 4}</span>` : '');
      const peek = (((p.blurb || '').match(/^[\s\S]*?[.!?](\s|$)/) || [p.blurb || ''])[0]).trim();
      return `<article class="proj reveal" data-lenses="${p.lenses.join(' ')}" data-idx="${idx}" tabindex="0" role="button" aria-label="${p.title} — open details">
        <div class="proj__top"><span class="proj__ic"><i class="fa-solid ${projIcon(p)}"></i></span><span class="proj__type">${p.type}</span></div>
        <h3 class="proj__title">${p.title}</h3>
        <div class="proj__stat"><i class="fa-solid fa-bolt ic"></i><span>${emphasize((p.metrics && p.metrics[0]) || '')}</span></div>
        <div class="proj__stack">${chips}</div>
        <button class="proj__more" type="button" tabindex="-1">View details <i class="fa-solid fa-arrow-right"></i></button>
        <div class="proj__peek">${peek}</div>
      </article>`;
    }).join('');
    $$('#projectGrid .proj').forEach(card => {
      attachTilt(card);
      const open = () => openProjectModal(+card.getAttribute('data-idx'));
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }
  const emphasize = s => String(s).replace(/(\d[\d.,]*%?)/g, '<b>$1</b>');
  function openProjectModal(idx) {
    const p = PROJECTS[idx]; if (!p) return;
    const links = Object.entries(p.links || {}).filter(([, v]) => v).map(([k, v]) => {
      const ic = k === 'repo' ? 'fa-brands fa-github' : k === 'demo' ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-solid fa-book-open';
      const lbl = k === 'repo' ? 'Code' : k === 'demo' ? 'Live' : 'Write-up';
      return `<a href="${v}" target="_blank" rel="noopener"><i class="${ic}"></i> ${lbl}</a>`;
    }).join('');
    $('#projModalBody').innerHTML = `<span class="modal__ic"><i class="fa-solid ${projIcon(p)}"></i></span>
      <span class="modal__type">${p.type} · ${p.lenses.map(l => lensMeta(l).short).join(' · ')}</span>
      <h3 class="modal__title">${p.title}</h3>
      <p class="modal__blurb">${p.blurb}</p>
      <div class="modal__metrics">${(p.metrics || []).map(m => `<div><i class="fa-solid fa-check"></i><span>${m}</span></div>`).join('')}</div>
      <div class="proj__stack" style="margin-bottom:1.3rem">${(p.stack || []).map(s => `<span>${s}</span>`).join('')}</div>
      <div class="proj__links">${links}</div>`;
    const m = $('#projModal'); m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  }
  function closeProjectModal() { const m = $('#projModal'); m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); if (!$('#article').classList.contains('open')) document.body.style.overflow = ''; }
  function setProjectFilter(id) {
    $$('#projectFilters .filter').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === id));
    $$('#projectGrid .proj').forEach(card => {
      const ok = id === 'all' || card.getAttribute('data-lenses').split(' ').includes(id);
      card.style.display = ok ? '' : 'none';
      if (ok) card.classList.add('in');
    });
  }
  function renderContributions(id) {
    const list = getTrack(id).contributions || [];
    $('#contributions').innerHTML = !list.length ? '' : `<div class="panel"><h3><i class="fa-solid fa-link"></i> Selected contributions & links</h3>
      <div class="focus-list">${list.map(c => `<a class="focus-item" href="${c.url}" target="_blank" rel="noopener" style="text-decoration:none"><i class="fa-solid fa-arrow-up-right-from-square"></i><span><b style="color:var(--text)">${c.label}</b><br><span style="font-size:.86rem">${c.note}</span></span></a>`).join('')}</div></div>`;
  }

  /* ---------- BUG BOUNTY ---------- */
  const sumNums = s => (String(s).match(/\d+/g) || []).reduce((a, n) => a + +n, 0);
  function renderBugBounty() {
    const bb = CONTENT.bugBounty; if (!bb) return;
    const counts = bb.programs.map(p => sumNums(p.findings)); const max = Math.max(...counts, 1);
    const programs = bb.programs.map((p, i) => `<div class="bb__row">
      <div class="bb__rowtop"><span class="bb__name"><i class="fa-solid fa-bug"></i> ${p.name}</span><span class="bb__count">${p.findings}</span></div>
      <div class="bb__bar"><span data-w="${Math.round(counts[i] / max * 100)}"></span></div></div>`).join('');
    const sev = bb.severity.map(s => {
      const cls = /crit/i.test(s.label) ? 'crit' : /high/i.test(s.label) ? 'high' : /med/i.test(s.label) ? 'med' : 'low';
      return `<div class="bb__sevchip ${cls}"><b data-count="${s.count}">${s.count}</b><small>${s.label}</small></div>`;
    }).join('');
    const hl = bb.highlights.map(h => {
      const sc = /crit/i.test(h.severity) ? 'sev-critical' : /high/i.test(h.severity) ? 'sev-high' : 'sev-medium';
      return `<button class="bb__hlcard" type="button"><div class="bb__hlhead"><span class="sev ${sc}">${h.severity}</span><h5>${h.title}</h5><i class="fa-solid fa-chevron-down chev"></i></div><p class="bb__hlblurb">${h.blurb}</p></button>`;
    }).join('');
    $('#bugBounty').innerHTML = `<div class="bb reveal">
      <div class="panel">
        <div class="bb__total"><b data-count="${bb.totalAccepted}">${bb.totalAccepted}</b><span>accepted findings across ${bb.programs.length} public programs</span></div>
        <div class="bb__prog">${programs}</div>
        <div class="bb__sev">${sev}</div>
      </div>
      <div class="panel"><h3><i class="fa-solid fa-crosshairs"></i> Representative findings <span style="color:var(--text-faint);font-weight:400;font-size:.78rem">— tap to expand</span></h3><div class="bb__hl">${hl}</div></div>
    </div>`;
    $$('#bugBounty .bb__hlcard').forEach(b => b.addEventListener('click', () => b.classList.toggle('open')));
  }

  /* ---------- TIMELINE ---------- */
  function renderTimeline() {
    $('#timeline').innerHTML = DATA.experience.map((e, i) => `<div class="tl-item ${i % 2 === 0 ? 'left' : 'right'} reveal">
      <span class="tl-dot"></span>
      <div class="tl-card"><span class="tl-when">${e.period}</span><h3 class="tl-role">${e.role}</h3><p class="tl-co"><b>${e.company}</b></p>
      <p class="tl-desc">${e.desc}</p>
      <div class="tl-badges">${(e.metrics || []).map(m => `<span class="tl-badge">${m}</span>`).join('')}</div>
      <button class="tl-toggle" type="button">Details <i class="fa-solid fa-chevron-down"></i></button>
      <div class="tl-details"><ul class="tl-points">${e.points.map(p => `<li><i class="fa-solid fa-angle-right"></i><span>${p}</span></li>`).join('')}</ul>
      <div class="tl-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div></div></div></div>`).join('');
    $$('#timeline .tl-toggle').forEach(btn => btn.addEventListener('click', () => btn.closest('.tl-item').classList.toggle('open')));
  }

  /* ---------- CREDENTIALS ---------- */
  function renderCredentials() {
    const cards = [];
    DATA.certifications.forEach(c => {
      const status = c.status === 'verified'
        ? `<a class="cert__status verified" href="${c.url}" target="_blank" rel="noopener"><i class="fa-solid fa-circle-check"></i> Verified</a>`
        : `<span class="cert__status progress"><i class="fa-solid fa-hourglass-half"></i> In progress</span>`;
      cards.push(`<div class="cert"><div class="cert__badge"><i class="fa-solid ${c.icon}"></i></div><div class="cert__name">${c.name}</div><div class="cert__full">${c.full}</div><div class="cert__org">${c.org}</div><div class="cert__date">${c.date}</div>${status}<p class="cert__desc">${c.desc}</p></div>`);
    });
    DATA.education.forEach(e => {
      cards.push(`<div class="cert"><div class="cert__badge"><i class="fa-solid ${e.icon}"></i></div><div class="cert__name">${e.name}</div><div class="cert__full">${e.org}</div><div class="cert__org">${e.grade}</div><div class="cert__date">${e.date}</div><span class="cert__status verified"><i class="fa-solid fa-graduation-cap"></i> ${e.grade}</span><p class="cert__desc">${e.desc}</p></div>`);
    });
    $('#certGrid').innerHTML = cards.join('');
    $('#achGrid').innerHTML = DATA.achievements.map(a => `<div class="ach"><span class="ach__ic"><i class="fa-solid ${a.icon}"></i></span><div><h4>${a.title}</h4><div class="ach__meta">${a.meta}</div><p>${a.desc}</p></div></div>`).join('');
  }

  /* ---------- BLOG ---------- */
  const lensName = id => (DATA.lenses.find(l => l.id === id) || { short: id === 'research' ? 'Research' : 'Overview' }).short;
  const TRACK_RGB = { cybersecurity: '255,77,109', engineering: '129,140,248', aiml: '52,211,153', uiux: '251,113,133', research: '52,211,153' };
  const trackRgb = t => TRACK_RGB[t] || '110,231,255';
  function renderBlogFilters() {
    const filters = [{ id: 'all', label: 'All' }, ...DATA.lenses.map(l => ({ id: l.id, label: l.short })), { id: 'research', label: 'Research' }];
    $('#blogFilters').innerHTML = filters.map((f, i) => `<button class="filter${i === 0 ? ' active' : ''}" data-blogfilter="${f.id}">${f.label}</button>`).join('');
    $$('#blogFilters .filter').forEach(b => b.addEventListener('click', () => { $$('#blogFilters .filter').forEach(x => x.classList.remove('active')); b.classList.add('active'); renderBlog(b.getAttribute('data-blogfilter')); }));
  }
  function renderBlog(filter) {
    const posts = POSTS.filter(p => filter === 'all' || p.track === filter);
    $('#blogGrid').innerHTML = posts.map(p => `<article class="post reveal" data-slug="${p.slug}" style="--pc:${trackRgb(p.track)}">
      <div class="post__meta"><span class="post__lens">${lensName(p.track)}</span><span>${fmtDate(p.date)}</span><span>· ${p.readingTime}</span></div>
      <h3 class="post__title">${p.title}</h3><p class="post__excerpt">${p.excerpt}</p>
      <div class="post__tags">${(p.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <span class="post__more">Read article <i class="fa-solid fa-arrow-right"></i></span></article>`).join('') || `<p style="color:var(--text-dim)">No posts in this category yet.</p>`;
    $$('#blogGrid .post').forEach(c => { c.addEventListener('click', () => { location.hash = '#/blog/' + c.getAttribute('data-slug'); }); if (revealObs) { revealObs.observe(c); } });
  }
  function fmtDate(d) {
    const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [y, m, day] = d.split('-'); return `${parseInt(day, 10)} ${M[parseInt(m, 10) - 1]} ${y}`;
  }

  /* ---------- CONTACT (email reveal) ---------- */
  function email() { return DATA.profile.emailUser + '@' + DATA.profile.emailDomain; }
  function renderContact() {
    const p = DATA.profile;
    $('#contactInfo').innerHTML = `
      <button class="contact-line reveal-email" id="revealEmail" type="button"><i class="fa-solid fa-envelope"></i><span><small>Email</small><span class="masked">click to reveal</span></span></button>
      <div class="contact-line"><i class="fa-solid fa-location-dot"></i><span><small>Based in</small>${p.location}</span></div>
      <div class="contact-line"><i class="fa-solid fa-briefcase"></i><span><small>Status</small>${p.availability}</span></div>
      <div class="hero__social" style="margin-top:1.4rem">${socialLinks()}</div>`;
    $('#revealEmail').addEventListener('click', function () {
      const e = email();
      this.outerHTML = `<a class="contact-line" href="mailto:${e}"><i class="fa-solid fa-envelope"></i><span><small>Email</small>${e}</span></a>`;
    });
    $('#contactForm').addEventListener('submit', e => {
      e.preventDefault(); const f = e.target;
      const subject = encodeURIComponent(f.subject.value + ' — via ramis.me');
      const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
      window.location.href = `mailto:${email()}?subject=${subject}&body=${body}`;
      toast('Opening your email client…'); f.reset();
    });
  }

  /* ---------- LENS SWITCH ---------- */
  function renderLensSwitchMenu() {
    const all = [DATA.overviewLens, ...DATA.lenses];
    $('#lensSwitchMenu').innerHTML = all.map(l => `<button class="lens-switch__opt" data-lens-opt="${l.id}" role="menuitem"><span class="dot" style="background:rgb(${l.rgb})"><i class="fa-solid ${l.icon}"></i></span><span>${l.label}<small>${l.blurb.slice(0, 38)}…</small></span></button>`).join('');
    $$('#lensSwitchMenu [data-lens-opt]').forEach(b => b.addEventListener('click', () => { setLens(b.getAttribute('data-lens-opt')); $('#lensSwitch').classList.remove('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', 'false'); }));
  }
  function updateLensSwitch(id) { $('#lensSwitchLabel').textContent = lensMeta(id).short; $$('#lensSwitchMenu [data-lens-opt]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lens-opt') === id)); }
  $('#lensSwitchBtn').addEventListener('click', e => { e.stopPropagation(); const open = $('#lensSwitch').classList.toggle('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', () => { $('#lensSwitch').classList.remove('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', 'false'); });

  /* ---------- TERMINAL ---------- */
  const TERMS = {
    overview: [['whoami', 'muhammad-ramis  —  security × engineering', 'ok'], ['cat ./focus', 'cybersecurity · engineering · ai-ml · ui-ux', 'v'], ['./credentials --short', 'OSCP+ · MSc Distinction · 51 accepted findings', 'ok']],
    cybersecurity: [['nmap -sV target', '22 ssh  80 http  443 https  8443 app', 'v'], ['./chain.py --ssrf', 'SSRF → 169.254.169.254 → temp IAM → AD pivot', 'warn'], ['bloodhound --shortest', 'KERBEROAST → ACL ABUSE → DOMAIN ADMIN', 'ok'], ['semgrep ci && suricata -T', 'gates green · detection rules valid', 'ok']],
    engineering: [['kubectl get deploy -A', 'api 6/6 · web 4/4 · worker 8/8  Ready', 'ok'], ['curl -w "%{time_total}" /health', 'p99 118ms · 6.5M req/day · zero-downtime', 'v'], ['mvn verify -Pkafka', 'JUnit + TestContainers PASS · 88% cov', 'ok']],
    aiml: [['python eval_agent.py', 'prompt-injection corpus: 0 tool-escapes', 'ok'], ['bugtraceai scan --auth', '145 findings → 43 validated exploitable', 'v'], ['mlflow runs --best', 'anomaly AUC 0.97 · FPR held < 1%', 'ok']],
    uiux: [['lighthouse --a11y', 'a11y 100 · perf 98 · best-practices 100', 'ok'], ['axe ./dashboard', '0 violations · WCAG 2.2 AA · focus valid', 'v'], ['npm run build', 'tokens compiled · 0 contrast failures', 'ok']]
  };
  let termRun = 0;
  function renderTerminal(id) {
    const seq = TERMS[id] || TERMS.overview; const box = $('#terminal');
    $('#termTitle').textContent = `ramis@ramis.me:~/${id}$`; box.innerHTML = '';
    const my = ++termRun;
    if (reduce) { box.innerHTML = seq.map(([c, o, k]) => `<div class="ln"><span class="pr">$</span> ${c}</div><div class="ln"><span class="${k}">${o}</span></div>`).join(''); return; }
    let li = 0;
    (function typeLine() {
      if (my !== termRun) return;
      if (li >= seq.length) { box.insertAdjacentHTML('beforeend', `<div class="ln"><span class="pr">$</span> <span class="term-cursor"></span></div>`); return; }
      const [cmd, out, kind] = seq[li]; const cl = document.createElement('div'); cl.className = 'ln'; cl.innerHTML = `<span class="pr">$</span> `; box.appendChild(cl);
      let ci = 0;
      (function typeCmd() {
        if (my !== termRun) return;
        cl.innerHTML = `<span class="pr">$</span> ${cmd.slice(0, ci++)}`;
        if (ci <= cmd.length) setTimeout(typeCmd, 24);
        else setTimeout(() => { if (my !== termRun) return; box.insertAdjacentHTML('beforeend', `<div class="ln"><span class="${kind}">${out}</span></div>`); li++; setTimeout(typeLine, 360); }, 220);
      })();
    })();
  }

  /* ============================================================
     MARKDOWN
     ============================================================ */
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function inlineMd(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
    return s;
  }
  function mdToHtml(md) {
    md = (md || '').replace(/\r\n/g, '\n');
    const codes = [];
    md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => { codes.push(`<pre><code>${esc(code.replace(/\n$/, ''))}</code></pre>`); return ` C${codes.length - 1} `; });
    const out = []; let lt = null, items = [];
    const flush = () => { if (lt) { out.push(`<${lt}>${items.join('')}</${lt}>`); lt = null; items = []; } };
    md.split('\n').forEach(line => {
      const cb = line.match(/^ C(\d+) $/); if (cb) { flush(); out.push(codes[+cb[1]]); return; }
      if (/^\s*$/.test(line)) { flush(); return; }
      const h = line.match(/^(#{1,4})\s+(.*)$/); if (h) { flush(); const lv = Math.min(Math.max(h[1].length, 2), 4); out.push(`<h${lv}>${inlineMd(h[2])}</h${lv}>`); return; }
      if (/^>\s?/.test(line)) { flush(); out.push(`<blockquote>${inlineMd(line.replace(/^>\s?/, ''))}</blockquote>`); return; }
      if (/^(-{3,}|_{3,})\s*$/.test(line)) { flush(); out.push('<hr/>'); return; }
      const ul = line.match(/^\s*[-*]\s+(.*)$/); const ol = line.match(/^\s*\d+\.\s+(.*)$/);
      if (ul) { if (lt !== 'ul') { flush(); lt = 'ul'; } items.push(`<li>${inlineMd(ul[1])}</li>`); return; }
      if (ol) { if (lt !== 'ol') { flush(); lt = 'ol'; } items.push(`<li>${inlineMd(ol[1])}</li>`); return; }
      flush(); out.push(`<p>${inlineMd(line)}</p>`);
    });
    flush(); return out.join('\n');
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function openArticle(slug) {
    const post = POSTS.find(p => p.slug === slug);
    if (!post) { closeArticle(); return; }
    if (!entered) enterSite('overview');
    $('#articleBody').innerHTML = `<div class="article__head reveal in"><span class="eyebrow">${lensName(post.track)} · ${post.readingTime}</span>
      <h1>${post.title}</h1>
      <div class="article__meta"><span><i class="fa-solid fa-calendar"></i> ${fmtDate(post.date)}</span><span><i class="fa-solid fa-user"></i> Muhammad Ramis</span><span>${(post.tags || []).map(t => `#${t}`).join('  ')}</span></div></div>
      <div class="md">${mdToHtml(post.body)}</div>
      <div style="margin-top:3rem"><a class="btn btn-ghost" href="#blog"><i class="fa-solid fa-arrow-left"></i> Back to all posts</a></div>`;
    const a = $('#article'); a.classList.add('open'); a.setAttribute('aria-hidden', 'false'); a.scrollTop = 0; document.body.style.overflow = 'hidden';
    document.title = `${post.title} — Muhammad Ramis`;
  }
  function closeArticle() { const a = $('#article'); a.classList.remove('open'); a.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; document.title = 'Muhammad Ramis — Penetration Tester & Security-Minded Engineer'; }
  function handleRoute() { const m = location.hash.match(/^#\/blog\/(.+)$/); if (m) openArticle(decodeURIComponent(m[1])); else closeArticle(); }
  window.addEventListener('hashchange', handleRoute);

  /* ============================================================
     REVEAL / COUNTERS / BARS
     ============================================================ */
  let revealObs;
  function startReveal() {
    revealObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); countUp(e.target); fillBars(e.target); revealObs.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(r => revealObs.observe(r));
    $$('.proj-grid .reveal, .blog-grid .reveal, .cert-grid .reveal, .ach-grid .reveal').forEach((r, i) => r.setAttribute('data-delay', String(i % 4)));
  }
  function fillBars(scope) { $$('.bb__bar span', scope).forEach(s => { s.style.width = (s.dataset.w || 0) + '%'; }); }
  function countUp(scope) {
    $$('[data-count]', scope.matches && scope.matches('.stat') ? scope.parentElement : scope).forEach(node => {
      if (node.dataset.done) return;
      const raw = node.getAttribute('data-count'); const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
      if (!m || reduce) { node.dataset.done = '1'; return; }
      node.dataset.done = '1';
      const pre = m[1], target = parseFloat(m[2].replace(/,/g, '')), post = m[3], dec = (m[2].split('.')[1] || '').length;
      const start = performance.now(), dur = 1100;
      (function frame(t) { const p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3), val = target * e; node.textContent = pre + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString()) + post; if (p < 1) requestAnimationFrame(frame); else node.textContent = pre + m[2] + post; })(start);
    });
  }

  /* ============================================================
     INTERACTIVITY
     ============================================================ */
  function attachTilt(node) {
    if (reduce) return;
    node.addEventListener('pointermove', e => {
      const r = node.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      node.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-6px)`;
    });
    node.addEventListener('pointerleave', () => { node.style.transform = ''; });
  }
  if (!reduce) {
    window.addEventListener('pointermove', e => { root.style.setProperty('--mx', e.clientX + 'px'); root.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
    const hero = $('#home');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      const col = hero.querySelectorAll('.hero__col')[1]; if (col) col.style.transform = `translate(${px * 10}px, ${py * 8}px)`;
    });
    hero.addEventListener('pointerleave', () => { const col = hero.querySelectorAll('.hero__col')[1]; if (col) col.style.transform = ''; });
  }

  /* ============================================================
     SCROLL / NAV
     ============================================================ */
  const nav = $('#nav'), bar = $('#scrollbar'), toTop = $('#toTop');
  window.addEventListener('scroll', () => {
    const y = window.scrollY; nav.classList.toggle('is-stuck', y > 30); toTop.classList.toggle('show', y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (h > 0 ? y / h * 100 : 0) + '%';
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  const navObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const id = e.target.id; $$('#navLinks a[data-nav]').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id)); } }), { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'focus', 'projects', 'bugbounty', 'experience', 'credentials', 'blog', 'contact'].forEach(id => { const s = $('#' + id); if (s) navObs.observe(s); });
  $('#burger').addEventListener('click', () => { const open = $('#navLinks').classList.toggle('open'); $('#burger').setAttribute('aria-expanded', String(open)); });
  $$('#navLinks a[data-nav]').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

  function toast(msg) { $('#toastMsg').textContent = msg; const t = $('#toast'); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); }

  // project modal close handlers
  $$('#projModal [data-close]').forEach(el => el.addEventListener('click', closeProjectModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectModal(); });

  /* ============================================================
     INIT
     ============================================================ */
  renderGateway();
  renderStatic();
  setLens('overview', { silent: true });
  const h = location.hash;
  if (/^#\/blog\//.test(h)) { enterSite('overview'); handleRoute(); }
  else if (h && $(h)) { enterSite('overview'); setTimeout(() => $(h).scrollIntoView(), 60); }

})();
