/* ============================================================
   Muhammad Ramis — portfolio app logic
   Lens system · rendering · hash router (blog) · animations
   ============================================================ */
(function () {
  'use strict';

  const DATA = window.DATA;
  const CONTENT = window.CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const byId = {};
  CONTENT.tracks.forEach(t => (byId[t.id] = t));

  /* ---------- overview pseudo-track ---------- */
  const firstPara = s => (s || '').split(/\n\s*\n/)[0];
  const OVERVIEW = {
    id: 'overview',
    label: 'The full picture',
    short: 'Overview',
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
    contributions: dedupeContrib(CONTENT.tracks.flatMap(t => t.contributions || [])).slice(0, 6)
  };
  function dedupeContrib(arr) {
    const seen = new Set(); const out = [];
    arr.forEach(c => { if (!seen.has(c.url)) { seen.add(c.url); out.push(c); } });
    return out;
  }
  const getTrack = id => (id === 'overview' ? OVERVIEW : byId[id]) || OVERVIEW;
  const lensMeta = id => DATA.lenses.find(l => l.id === id) || DATA.overviewLens;

  /* ---------- aggregate projects across lenses ---------- */
  const PROJECTS = [];
  (function buildProjects() {
    const map = new Map();
    CONTENT.tracks.forEach(t => {
      (t.projects || []).forEach(p => {
        const key = p.title.trim().toLowerCase();
        if (map.has(key)) { map.get(key).lenses.push(t.id); }
        else { const c = Object.assign({}, p, { lenses: [t.id] }); map.set(key, c); PROJECTS.push(c); }
      });
    });
  })();
  const projIcon = p => {
    const t = (p.tags || []).join(' ').toLowerCase() + ' ' + p.title.toLowerCase();
    const m = [
      [/ai|llm|bugtrace/, 'fa-robot'], [/bounty|bug/, 'fa-bug'], [/active.?directory|domain/, 'fa-network-wired'],
      [/gdpr|privacy|compliance/, 'fa-user-shield'], [/microservice|platform|backend|\.net|dotnet/, 'fa-diagram-project'],
      [/harden|siem|zero.?trust|detection/, 'fa-server'], [/crypto|signature|quantum/, 'fa-key'],
      [/access|wcag|a11y|design.system/, 'fa-universal-access'], [/dashboard|portal|ui|ux/, 'fa-pen-ruler'],
      [/incident|forensic/, 'fa-triangle-exclamation'], [/api|gateway/, 'fa-code'], [/real.?time|chat|stream|messag/, 'fa-comments'],
      [/ecommerce|e-commerce|payment|shop/, 'fa-cart-shopping'], [/mobile|react native/, 'fa-mobile-screen']
    ];
    for (const [re, ic] of m) if (re.test(t)) return ic;
    return lensMeta(p.lenses[0]).icon;
  };

  /* ============================================================
     THEME
     ============================================================ */
  const root = document.documentElement;
  (function initTheme() {
    const saved = localStorage.getItem('ramis-theme');
    if (saved) root.setAttribute('data-theme', saved);
    syncThemeIcon();
  })();
  function syncThemeIcon() {
    const dark = root.getAttribute('data-theme') !== 'light';
    $('#themeToggle').innerHTML = `<i class="fa-solid fa-${dark ? 'moon' : 'sun'}"></i>`;
  }
  $('#themeToggle').addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') !== 'light';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('ramis-theme', dark ? 'light' : 'dark');
    syncThemeIcon();
  });

  /* ============================================================
     LENS STATE
     ============================================================ */
  let currentLens = 'overview';

  function setLens(id, opts = {}) {
    currentLens = id;
    root.setAttribute('data-lens', id);
    renderHero(id);
    renderFocus(id);
    renderContributions(id);
    renderTerminal(id);
    updateLensSwitch(id);
    // default project filter follows the lens
    setProjectFilter(id === 'overview' ? 'all' : id, true);
    const cv = DATA.profile.cvByLens[id] || DATA.profile.cvByLens.overview;
    $('#heroCv').setAttribute('href', cv);
    $('#footLens').textContent = getTrack(id).short;
    if (!opts.silent) pulseAccent();
  }
  function pulseAccent() {
    if (reduce) return;
    const b = $('#nav'); b.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.25)' }, { filter: 'brightness(1)' }], { duration: 500 });
  }

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
        <span class="lens-card__body">
          <span class="lens-card__title">${ov.label}</span>
          <span class="lens-card__desc">${ov.blurb}</span>
        </span>
        <span class="lens-card__go">Enter <i class="fa-solid fa-arrow-right"></i></span>
      </button>`;
    grid.innerHTML = cards + overviewCard;
    $$('[data-lens-card]', grid).forEach(b => b.addEventListener('click', () => enterSite(b.getAttribute('data-lens-card'))));
    requestAnimationFrame(() => $('#gateway').classList.add('is-ready'));
    typeRoles();
  }

  function typeRoles() {
    const roles = CONTENT.overview.heroTaglines || ['Penetration Tester'];
    const eln = $('#gatewayRoles');
    if (reduce) { eln.textContent = roles[0]; return; }
    let ri = 0, ci = 0, del = false;
    (function tick() {
      const word = roles[ri];
      eln.textContent = del ? word.slice(0, ci--) : word.slice(0, ci++);
      let wait = del ? 40 : 70;
      if (!del && ci > word.length) { del = true; wait = 1400; }
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
    }
    setLens(lensId, { silent: true });
    startReveal();
  }
  $('#enterAll').addEventListener('click', e => { e.preventDefault(); enterSite('overview'); });

  /* ============================================================
     RENDER — static blocks
     ============================================================ */
  function socialLinks(cls) {
    return DATA.profile.socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" class="${cls || ''}"><i class="${s.icon}"></i></a>`).join('');
  }

  function renderStatic() {
    $('#year').textContent = '2026';
    $('#heroSocial').innerHTML = socialLinks();
    $('#footSocial').innerHTML = socialLinks();

    // marquee (doubled for seamless loop)
    const items = DATA.marquee.map(m => `<span>${m}</span>`).join('');
    $('#marquee').innerHTML = items + items;

    // about prose + philosophy + stats
    $('#aboutProse').innerHTML = mdToHtml(CONTENT.overview.about);
    $('#philosophy').innerHTML = CONTENT.overview.philosophy.map(p => `
      <div class="phi"><span class="phi__ic"><i class="fa-solid fa-${p.icon}"></i></span>
      <div><h4>${p.title}</h4><p>${p.text}</p></div></div>`).join('');
    $('#aboutStats').innerHTML = OVERVIEW.stats.map(s => statCard(s)).join('') ;

    renderProjectsOnce();
    renderTimeline();
    renderCredentials();
    renderBlogFilters();
    renderBlog('all');
    renderContact();
    renderLensSwitchMenu();
  }

  const statCard = s => `<div class="stat"><div class="stat__num" data-count="${s.value}">${s.value}</div><div class="stat__label">${s.label}</div></div>`;

  /* ---------- HERO (lens-aware) ---------- */
  function renderHero(id) {
    const t = getTrack(id);
    const badges = [
      `<span class="chip"><i class="fa-solid fa-location-dot"></i> ${DATA.profile.location}</span>`,
      `<span class="chip"><i class="fa-solid fa-circle-check"></i> ${DATA.profile.availability}</span>`,
      ...t.stats.slice(0, 2).map(s => `<span class="chip"><i class="fa-solid fa-bolt"></i> ${s.value} ${s.label}</span>`)
    ].join('');
    $('#heroBadges').innerHTML = badges;
    $('#heroSub').textContent = t.summary;
    typeInto($('#heroLensline'), t.tagline);
  }

  let typeTimer = null;
  function typeInto(node, text) {
    clearTimeout(typeTimer);
    if (reduce) { node.textContent = text; return; }
    let i = 0; node.textContent = '';
    (function step() {
      node.textContent = text.slice(0, i++);
      if (i <= text.length) typeTimer = setTimeout(step, 22);
    })();
  }

  /* ---------- FOCUS ---------- */
  function renderFocus(id) {
    const t = getTrack(id);
    $('#focusEyebrow').textContent = t.label;
    $('#focusTitle').innerHTML = id === 'overview'
      ? `Four lenses, <span class="grad">one engineer</span>`
      : `<span class="grad">${t.short}</span> — focus & toolkit`;
    $('#focusSub').textContent = t.summary;
    $('#focusAreas').innerHTML = `<h3><i class="fa-solid fa-crosshairs"></i> What I work on</h3>
      <div class="focus-list">${t.focusAreas.map(f => `<div class="focus-item"><i class="fa-solid fa-angle-right"></i><span>${f}</span></div>`).join('')}</div>`;
    $('#focusTools').innerHTML = `<h3><i class="fa-solid fa-toolbox"></i> Tools & tech I reach for</h3>
      <div class="tags">${t.tools.map(x => `<span class="tag">${x}</span>`).join('')}</div>`;
  }

  /* ---------- PROJECTS ---------- */
  function renderProjectsOnce() {
    const filters = [{ id: 'all', label: 'All', icon: 'fa-layer-group' },
      ...DATA.lenses.map(l => ({ id: l.id, label: l.short, icon: l.icon }))];
    $('#projectFilters').innerHTML = filters.map(f =>
      `<button class="filter" data-filter="${f.id}"><i class="fa-solid ${f.icon}"></i> ${f.label}</button>`).join('');
    $$('#projectFilters .filter').forEach(b => b.addEventListener('click', () => setProjectFilter(b.getAttribute('data-filter'))));

    $('#projectGrid').innerHTML = PROJECTS.map((p, idx) => {
      const links = Object.entries(p.links || {}).filter(([, v]) => v).map(([k, v]) => {
        const ic = k === 'repo' ? 'fa-brands fa-github' : k === 'demo' ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-solid fa-book-open';
        const lbl = k === 'repo' ? 'Code' : k === 'demo' ? 'Live' : 'Write-up';
        return `<a href="${v}" target="_blank" rel="noopener"><i class="${ic}"></i> ${lbl}</a>`;
      }).join('');
      return `<article class="proj reveal" data-lenses="${p.lenses.join(' ')}" data-idx="${idx}">
        <div class="proj__top">
          <span class="proj__ic"><i class="fa-solid ${projIcon(p)}"></i></span>
          <span class="proj__type">${p.type}</span>
        </div>
        <h3 class="proj__title">${p.title}</h3>
        <p class="proj__blurb">${p.blurb}</p>
        <div class="proj__metrics">${(p.metrics || []).map(m => `<div><i class="fa-solid fa-check"></i><span>${m}</span></div>`).join('')}</div>
        <div class="proj__stack">${(p.stack || []).map(s => `<span>${s}</span>`).join('')}</div>
        <div class="proj__links">${links}</div>
      </article>`;
    }).join('');
  }

  function setProjectFilter(id, silent) {
    $$('#projectFilters .filter').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === id));
    let shown = 0;
    $$('#projectGrid .proj').forEach(card => {
      const ok = id === 'all' || card.getAttribute('data-lenses').split(' ').includes(id);
      card.style.display = ok ? '' : 'none';
      if (ok) { card.classList.add('in'); shown++; }
    });
  }

  function renderContributions(id) {
    const t = getTrack(id);
    const list = t.contributions || [];
    if (!list.length) { $('#contributions').innerHTML = ''; return; }
    $('#contributions').innerHTML = `
      <div class="panel">
        <h3><i class="fa-solid fa-link"></i> Selected contributions & links</h3>
        <div class="focus-list">
          ${list.map(c => `<a class="focus-item" href="${c.url}" target="_blank" rel="noopener" style="text-decoration:none">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span><b style="color:var(--text)">${c.label}</b><br><span style="font-size:.86rem">${c.note}</span></span></a>`).join('')}
        </div>
      </div>`;
  }

  /* ---------- TIMELINE ---------- */
  function renderTimeline() {
    $('#timeline').innerHTML = DATA.experience.map((e, i) => `
      <div class="tl-item ${i % 2 === 0 ? 'left' : 'right'} reveal">
        <span class="tl-dot"></span>
        <div class="tl-card">
          <span class="tl-when">${e.period}</span>
          <h3 class="tl-role">${e.role}</h3>
          <p class="tl-co"><b>${e.company}</b></p>
          <p class="tl-desc">${e.desc}</p>
          <ul class="tl-points">${e.points.map(p => `<li><i class="fa-solid fa-angle-right"></i><span>${p}</span></li>`).join('')}</ul>
          <div class="tl-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
      </div>`).join('');
  }

  /* ---------- CREDENTIALS ---------- */
  function renderCredentials() {
    const cards = [];
    DATA.certifications.forEach(c => {
      const status = c.status === 'verified'
        ? `<a class="cert__status verified" href="${c.url}" target="_blank" rel="noopener"><i class="fa-solid fa-circle-check"></i> Verified</a>`
        : `<span class="cert__status progress"><i class="fa-solid fa-hourglass-half"></i> In progress</span>`;
      cards.push(`<div class="cert"><div class="cert__badge"><i class="fa-solid ${c.icon}"></i></div>
        <div class="cert__name">${c.name}</div><div class="cert__full">${c.full}</div>
        <div class="cert__org">${c.org}</div><div class="cert__date">${c.date}</div>${status}
        <p class="cert__full" style="margin-top:.8rem;min-height:auto">${c.desc}</p></div>`);
    });
    DATA.education.forEach(e => {
      cards.push(`<div class="cert"><div class="cert__badge"><i class="fa-solid ${e.icon}"></i></div>
        <div class="cert__name">${e.name}</div><div class="cert__full">${e.org}</div>
        <div class="cert__org">${e.grade}</div><div class="cert__date">${e.date}</div>
        <span class="cert__status verified"><i class="fa-solid fa-graduation-cap"></i> ${e.grade}</span>
        <p class="cert__full" style="margin-top:.8rem;min-height:auto">${e.desc}</p></div>`);
    });
    $('#certGrid').innerHTML = cards.join('');

    $('#achGrid').innerHTML = DATA.achievements.map(a => `
      <div class="ach"><span class="ach__ic"><i class="fa-solid ${a.icon}"></i></span>
      <div><h4>${a.title}</h4><div class="ach__meta">${a.meta}</div><p>${a.desc}</p></div></div>`).join('');
  }

  /* ---------- BLOG ---------- */
  const lensName = id => (DATA.lenses.find(l => l.id === id) || { short: id === 'research' ? 'Research' : 'Overview' }).short;
  function renderBlogFilters() {
    const filters = [{ id: 'all', label: 'All' }, ...DATA.lenses.map(l => ({ id: l.id, label: l.short })), { id: 'research', label: 'Research' }];
    $('#blogFilters').innerHTML = filters.map((f, i) =>
      `<button class="filter${i === 0 ? ' active' : ''}" data-blogfilter="${f.id}">${f.label}</button>`).join('');
    $$('#blogFilters .filter').forEach(b => b.addEventListener('click', () => {
      $$('#blogFilters .filter').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); renderBlog(b.getAttribute('data-blogfilter'));
    }));
  }
  function renderBlog(filter) {
    const posts = CONTENT.blog.filter(p => filter === 'all' || p.track === filter);
    $('#blogGrid').innerHTML = posts.map(p => `
      <article class="post reveal" data-slug="${p.slug}">
        <div class="post__meta"><span class="post__lens">${lensName(p.track)}</span><span>${fmtDate(p.date)}</span><span>· ${p.readingTime}</span></div>
        <h3 class="post__title">${p.title}</h3>
        <p class="post__excerpt">${p.excerpt}</p>
        <div class="post__tags">${(p.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <span class="post__more">Read article <i class="fa-solid fa-arrow-right"></i></span>
      </article>`).join('') || `<p style="color:var(--text-dim)">No posts in this category yet.</p>`;
    $$('#blogGrid .post').forEach(c => { c.addEventListener('click', () => { location.hash = '#/blog/' + c.getAttribute('data-slug'); }); observeReveal(c); });
  }
  function fmtDate(d) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [y, m, day] = d.split('-');
    return `${parseInt(day, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
  }

  /* ---------- CONTACT ---------- */
  function renderContact() {
    const p = DATA.profile;
    $('#contactInfo').innerHTML = `
      <a class="contact-line" href="mailto:${p.email}"><i class="fa-solid fa-envelope"></i><span><small>Email</small>${p.email}</span></a>
      <a class="contact-line" href="tel:${p.phone.replace(/\s/g, '')}"><i class="fa-solid fa-phone"></i><span><small>Phone</small>${p.phone}</span></a>
      <div class="contact-line"><i class="fa-solid fa-location-dot"></i><span><small>Based in</small>${p.location}</span></div>
      <div class="contact-line"><i class="fa-solid fa-briefcase"></i><span><small>Status</small>${p.availability}</span></div>
      <div class="hero__social" style="margin-top:1.4rem">${socialLinks()}</div>`;
    $('#contactForm').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const subject = encodeURIComponent(f.subject.value + ' — via ramis.me');
      const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
      window.location.href = `mailto:${p.email}?subject=${subject}&body=${body}`;
      toast('Opening your email client…');
      f.reset();
    });
  }

  /* ---------- LENS SWITCH (nav) ---------- */
  function renderLensSwitchMenu() {
    const all = [DATA.overviewLens, ...DATA.lenses];
    $('#lensSwitchMenu').innerHTML = all.map(l => `
      <button class="lens-switch__opt" data-lens-opt="${l.id}" role="menuitem">
        <span class="dot" style="background:linear-gradient(135deg, rgb(${l.rgb}), rgb(${l.rgb}))"><i class="fa-solid ${l.icon}"></i></span>
        <span>${l.label}<small>${l.blurb.slice(0, 38)}…</small></span>
      </button>`).join('');
    $$('#lensSwitchMenu [data-lens-opt]').forEach(b => b.addEventListener('click', () => {
      setLens(b.getAttribute('data-lens-opt'));
      $('#lensSwitch').classList.remove('open');
      $('#lensSwitchBtn').setAttribute('aria-expanded', 'false');
    }));
  }
  function updateLensSwitch(id) {
    const m = lensMeta(id);
    $('#lensSwitchLabel').textContent = m.short;
    $$('#lensSwitchMenu [data-lens-opt]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lens-opt') === id));
  }
  $('#lensSwitchBtn').addEventListener('click', e => {
    e.stopPropagation();
    const sw = $('#lensSwitch'); const open = sw.classList.toggle('open');
    $('#lensSwitchBtn').setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', () => { $('#lensSwitch').classList.remove('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', 'false'); });

  /* ---------- TERMINAL ---------- */
  const TERMS = {
    overview: [
      ['whoami', 'muhammad-ramis  —  pentester × engineer', 'ok'],
      ['cat ./focus', 'offensive · defensive · engineering · ui-ux', 'v'],
      ['./credentials --short', 'OSCP+ · MSc Distinction · 51 accepted findings', 'ok']
    ],
    offensive: [
      ['nmap -sV --top-ports 1000 target', '22/tcp ssh   80/tcp http   443/tcp https   8443/tcp app', 'v'],
      ['./chain.py --ssrf', 'SSRF → 169.254.169.254 → temp IAM creds → AD pivot', 'warn'],
      ['bloodhound --shortest-path', 'KERBEROAST → ACL ABUSE → DOMAIN ADMIN  [3 hops]', 'ok']
    ],
    defensive: [
      ['semgrep ci --config auto', '0 high · 0 critical  (gates green)', 'ok'],
      ['./triage --ingest scanner.json', '8,400 findings → 61% noise removed → 312 to review', 'v'],
      ['suricata -T && kubectl get po', 'rules OK · pods Running · uptime 99.99%', 'ok']
    ],
    engineering: [
      ['kubectl get deploy -A', 'api  6/6 · web 4/4 · worker 8/8   all Ready', 'ok'],
      ['curl -w "%{time_total}" /health', 'p99 118ms · 6.5M req/day · zero-downtime rollouts', 'v'],
      ['dotnet test && k6 run load.js', 'PASS  ·  SLO budget held under peak', 'ok']
    ],
    uiux: [
      ['lighthouse --only=a11y,perf', 'a11y 100 · perf 98 · best-practices 100', 'ok'],
      ['axe ./dashboard', '0 violations · WCAG 2.2 AA · focus order valid', 'v'],
      ['npm run build', 'design tokens compiled · 0 contrast failures', 'ok']
    ]
  };
  let termRun = 0;
  function renderTerminal(id) {
    const seq = TERMS[id] || TERMS.overview;
    const box = $('#terminal');
    $('#termTitle').textContent = `ramis@ramis.me:~/${id}$`;
    box.innerHTML = '';
    const myRun = ++termRun;
    if (reduce) {
      box.innerHTML = seq.map(([c, o, k]) => `<div class="ln"><span class="pr">$</span> ${c}</div><div class="ln"><span class="${k}">${o}</span></div>`).join('');
      return;
    }
    let li = 0;
    (function typeLine() {
      if (myRun !== termRun) return;
      if (li >= seq.length) { box.insertAdjacentHTML('beforeend', `<div class="ln"><span class="pr">$</span> <span class="term-cursor"></span></div>`); return; }
      const [cmd, out, kind] = seq[li];
      const cmdLn = document.createElement('div'); cmdLn.className = 'ln'; cmdLn.innerHTML = `<span class="pr">$</span> `;
      box.appendChild(cmdLn);
      let ci = 0;
      (function typeCmd() {
        if (myRun !== termRun) return;
        cmdLn.innerHTML = `<span class="pr">$</span> ${cmd.slice(0, ci++)}`;
        if (ci <= cmd.length) setTimeout(typeCmd, 26);
        else setTimeout(() => {
          if (myRun !== termRun) return;
          box.insertAdjacentHTML('beforeend', `<div class="ln"><span class="${kind}">${out}</span></div>`);
          li++; setTimeout(typeLine, 380);
        }, 240);
      })();
    })();
  }

  /* ============================================================
     MARKDOWN (mini)
     ============================================================ */
  function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function inlineMd(s) {
    s = escapeHtml(s);
    s = s.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
    return s;
  }
  function mdToHtml(md) {
    md = (md || '').replace(/\r\n/g, '\n');
    const codes = [];
    md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => {
      codes.push(`<pre><code>${escapeHtml(code.replace(/\n$/, ''))}</code></pre>`);
      return ` C${codes.length - 1} `;
    });
    const out = []; let listType = null, items = [];
    const flush = () => { if (listType) { out.push(`<${listType}>${items.join('')}</${listType}>`); listType = null; items = []; } };
    md.split('\n').forEach(line => {
      const cb = line.match(/^ C(\d+) $/);
      if (cb) { flush(); out.push(codes[+cb[1]]); return; }
      if (/^\s*$/.test(line)) { flush(); return; }
      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) { flush(); const lv = Math.min(Math.max(h[1].length, 2), 4); out.push(`<h${lv}>${inlineMd(h[2])}</h${lv}>`); return; }
      if (/^>\s?/.test(line)) { flush(); out.push(`<blockquote>${inlineMd(line.replace(/^>\s?/, ''))}</blockquote>`); return; }
      if (/^(-{3,}|_{3,})\s*$/.test(line)) { flush(); out.push('<hr/>'); return; }
      const ul = line.match(/^\s*[-*]\s+(.*)$/);
      const ol = line.match(/^\s*\d+\.\s+(.*)$/);
      if (ul) { if (listType !== 'ul') { flush(); listType = 'ul'; } items.push(`<li>${inlineMd(ul[1])}</li>`); return; }
      if (ol) { if (listType !== 'ol') { flush(); listType = 'ol'; } items.push(`<li>${inlineMd(ol[1])}</li>`); return; }
      flush(); out.push(`<p>${inlineMd(line)}</p>`);
    });
    flush();
    return out.join('\n');
  }

  /* ============================================================
     ROUTER (blog articles via #/blog/<slug>)
     ============================================================ */
  function openArticle(slug) {
    const post = CONTENT.blog.find(p => p.slug === slug);
    if (!post) { closeArticle(); return; }
    if (!entered) enterSite('overview');
    $('#articleBody').innerHTML = `
      <div class="article__head reveal in">
        <span class="eyebrow">${lensName(post.track)} · ${post.readingTime}</span>
        <h1>${post.title}</h1>
        <div class="article__meta"><span><i class="fa-solid fa-calendar"></i> ${fmtDate(post.date)}</span>
          <span><i class="fa-solid fa-user"></i> Muhammad Ramis</span>
          <span>${(post.tags || []).map(t => `#${t}`).join('  ')}</span></div>
      </div>
      <div class="md">${mdToHtml(post.body)}</div>
      <div style="margin-top:3rem"><a class="btn btn-ghost" href="#blog"><i class="fa-solid fa-arrow-left"></i> Back to all posts</a></div>`;
    const a = $('#article'); a.classList.add('open'); a.setAttribute('aria-hidden', 'false');
    a.scrollTop = 0; document.body.style.overflow = 'hidden';
    document.title = `${post.title} — Muhammad Ramis`;
  }
  function closeArticle() {
    const a = $('#article'); a.classList.remove('open'); a.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.title = 'Muhammad Ramis — Penetration Tester & Security-Minded Engineer';
  }
  function handleRoute() {
    const h = location.hash;
    const m = h.match(/^#\/blog\/(.+)$/);
    if (m) openArticle(decodeURIComponent(m[1]));
    else closeArticle();
  }
  window.addEventListener('hashchange', handleRoute);

  /* ============================================================
     SCROLL / REVEAL / NAV
     ============================================================ */
  let revealObs;
  function startReveal() {
    revealObs = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.querySelector('[data-count]') || e.target.matches('.stat')) countUp(e.target); revealObs.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(r => revealObs.observe(r));
    // stagger same-row reveals
    $$('.proj-grid .reveal, .blog-grid .reveal, .cert-grid .reveal, .ach-grid .reveal').forEach((r, i) => r.setAttribute('data-delay', String(i % 4)));
  }
  function observeReveal(node) { if (revealObs && node) { node.classList.add('reveal'); revealObs.observe(node); } }

  function countUp(scope) {
    $$('[data-count]', scope.matches('.stat') ? scope.parentElement : scope).forEach(node => {
      if (node.dataset.done) return;
      const raw = node.getAttribute('data-count');
      const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
      if (!m || reduce) { node.dataset.done = '1'; return; }
      node.dataset.done = '1';
      const pre = m[1], target = parseFloat(m[2].replace(/,/g, '')), post = m[3];
      const dec = (m[2].split('.')[1] || '').length;
      const start = performance.now(), dur = 1100;
      (function frame(t) {
        const p = Math.min((t - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const val = (target * e);
        node.textContent = pre + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString()) + post;
        if (p < 1) requestAnimationFrame(frame);
        else node.textContent = pre + m[2] + post;
      })(start);
    });
  }

  // nav stuck + scroll progress + to-top + active link
  const nav = $('#nav'), bar = $('#scrollbar'), toTop = $('#toTop');
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 30);
    toTop.classList.toggle('show', y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  // active nav link
  const navObs = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      $$('#navLinks a[data-nav]').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'focus', 'projects', 'experience', 'credentials', 'blog', 'contact'].forEach(id => { const s = $('#' + id); if (s) navObs.observe(s); });

  // mobile menu
  $('#burger').addEventListener('click', () => {
    const open = $('#navLinks').classList.toggle('open');
    $('#burger').setAttribute('aria-expanded', String(open));
  });
  $$('#navLinks a[data-nav]').forEach(a => a.addEventListener('click', () => { $('#navLinks').classList.remove('open'); }));

  function toast(msg) {
    $('#toastMsg').textContent = msg;
    const t = $('#toast'); t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ============================================================
     INIT
     ============================================================ */
  renderGateway();
  renderStatic();
  setLens('overview', { silent: true });

  // deep link: open straight into the site (skip gateway) if URL targets content
  const h = location.hash;
  if (/^#\/blog\//.test(h)) { enterSite('overview'); handleRoute(); }
  else if (h && $(h)) { enterSite('overview'); setTimeout(() => $(h).scrollIntoView(), 60); }

})();
