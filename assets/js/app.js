/* ============================================================
   Muhammad Ramis - portfolio app logic (v3 app-shell)
   View router (no mega-scroll) · lens system · bento home
   · command palette · bug bounty · blog · interactivity
   ============================================================ */
(function () {
  'use strict';

  const DATA = window.DATA;
  const CONTENT = window.CONTENT;
  const POSTS = (window.POSTS || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  // Motion is a USER preference (toggle in the nav), defaulting ON - NOT driven by the OS
  // prefers-reduced-motion media query, because this site is an animated showcase and many
  // desktops have OS reduce-motion on. Motion-sensitive visitors can switch it off (persisted).
  let reduce = localStorage.getItem('ramis-motion') === 'off';
  const root = document.documentElement;
  root.classList.add('js'); // enables JS-only entrance animations (content still shows if JS fails)
  root.setAttribute('data-motion', reduce ? 'off' : 'on');

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
      { value: '10+', label: 'Years experience' },
      { value: '4', label: 'Disciplines, one operator' }
    ],
    focusAreas: DATA.lenses.map(l => `${l.label} - ${l.blurb}`),
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
  const emphasize = s => String(s).replace(/(\d[\d.,]*%?)/g, '<b>$1</b>');
  const SHOT_BASE = 'assets/img/shots/';
  const escAttr = s => String(s || '').replace(/"/g, '&quot;');
  const isFork = role => /contrib|fork|maintain/i.test(role || '');
  const roleBadge = p => p.role ? `<span class="proj__role${isFork(p.role) ? ' is-fork' : ''}" title="${isFork(p.role) ? 'Contributed to an existing/owned product' : 'Designed & built by me'}"><i class="fa-solid ${isFork(p.role) ? 'fa-code-fork' : 'fa-star'}"></i> ${p.role}</span>` : '';
  const coverHTML = p => p.shot ? `<div class="proj__cover"><img src="${SHOT_BASE}${p.shot}.svg" alt="${escAttr(p.title)} interface preview" loading="lazy" width="800" height="500" />${roleBadge(p)}</div>` : '';

  /* ============================================================
     THEME
     ============================================================ */
  (function () { const s = localStorage.getItem('ramis-theme'); if (s) root.setAttribute('data-theme', s); syncTheme(); })();
  function syncTheme() { const dark = root.getAttribute('data-theme') !== 'light'; $('#themeToggle').innerHTML = `<i class="fa-solid fa-${dark ? 'moon' : 'sun'}"></i>`; }
  function toggleTheme() {
    const dark = root.getAttribute('data-theme') !== 'light';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('ramis-theme', dark ? 'light' : 'dark'); syncTheme();
  }
  $('#themeToggle').addEventListener('click', toggleTheme);

  /* ---------- motion preference (animations on/off) ---------- */
  function syncMotion() { const b = $('#motionToggle'); if (b) { b.innerHTML = `<i class="fa-solid fa-${reduce ? 'play' : 'pause'}"></i>`; b.setAttribute('aria-pressed', String(!reduce)); b.setAttribute('data-tooltip', reduce ? 'Enable animations' : 'Reduce motion'); b.setAttribute('aria-label', reduce ? 'Enable animations' : 'Reduce motion'); } }
  function toggleMotion() { reduce = !reduce; localStorage.setItem('ramis-motion', reduce ? 'off' : 'on'); root.setAttribute('data-motion', reduce ? 'off' : 'on'); syncMotion(); location.reload(); }
  const motionBtn = $('#motionToggle'); if (motionBtn) { syncMotion(); motionBtn.addEventListener('click', toggleMotion); }

  /* ============================================================
     VIEW ROUTER
     ============================================================ */
  const VIEWS = ['home', 'about', 'work', 'security', 'experience', 'writing', 'contact'];
  const HOME_TITLE = 'Muhammad Ramis - Software & AI Engineer · OSCP+ Penetration Tester';
  const VIEW_TITLES = { about: 'About', work: 'Work', security: 'Security & Bug Bounty', experience: 'Experience', writing: 'Writing', contact: 'Contact' };
  let currentView = 'home';

  // A "side" (chosen at the intro) maps to a lens + the nav views it exposes under HARD FOCUS.
  // Home/About/Contact are lens-aware shells (always shown); Work/Security/Experience/Writing are field content.
  // Only Cybersecurity (and Everything) expose the Security/bug-bounty view.
  const SIDES = {
    everything:    { lens: 'overview',      views: VIEWS },
    engineering:   { lens: 'engineering',   views: ['home', 'about', 'work', 'experience', 'writing', 'contact'] },
    aiml:          { lens: 'aiml',          views: ['home', 'about', 'work', 'experience', 'writing', 'contact'] },
    cybersecurity: { lens: 'cybersecurity', views: ['home', 'about', 'work', 'security', 'experience', 'writing', 'contact'] },
    uiux:          { lens: 'uiux',          views: ['home', 'about', 'work', 'experience', 'writing', 'contact'] }
  };
  const sideForLens = lensId => Object.keys(SIDES).find(k => SIDES[k].lens === lensId) || 'everything';
  const lensViews = lensId => SIDES[sideForLens(lensId)].views;

  function showView(id) {
    if (!VIEWS.includes(id)) id = 'home';
    if (id !== 'home' && !lensViews(currentLens).includes(id)) id = 'home'; // hard-focus: hidden views redirect home
    currentView = id;
    root.setAttribute('data-route', id);
    const v = $(`.view[data-view="${id}"]`);
    $$('.view').forEach(el => el.classList.toggle('is-active', el.dataset.view === id));
    $$('[data-tab-link]').forEach(a => a.classList.toggle('active', a.getAttribute('data-tab-link') === id));
    window.scrollTo(0, 0);
    revealScope(v);
    countUp(v); fillBars(v);
    document.title = id === 'home' ? HOME_TITLE : `${VIEW_TITLES[id]} - Muhammad Ramis`;
    $('#navLinks').classList.remove('open');
    $('#burger').setAttribute('aria-expanded', 'false');
    focusHeading(v);
    announce((id === 'home' ? 'Home' : VIEW_TITLES[id]) + ' - page loaded');
    trackView(id === 'home' ? '/' : '/' + id, document.title);
  }
  // Staggered entrance: reset then re-trigger CSS transitions - reliable in every browser.
  function revealScope(scope) {
    if (!scope) return;
    const items = $$('.rv', scope);
    items.forEach(el => { el.classList.remove('in'); el.style.animationDelay = ''; });
    void scope.offsetWidth; // single reflow → the keyframe animation restarts on re-add
    items.forEach((el, i) => {
      el.style.animationDelay = reduce ? '0ms' : (Math.min(i, 14) * 55) + 'ms';
      el.classList.add('in');
    });
  }
  function focusHeading(scope) {
    if (!scope) return;
    const h = scope.querySelector('h1, h2');
    if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
  }
  function announce(msg) {
    const a = $('#srAnnounce'); if (!a) return;
    a.textContent = ''; setTimeout(() => { a.textContent = msg; }, 40);
  }

  /* ---------- analytics: SPA virtual pageviews ---------- */
  function trackView(path, title) {
    try { if (window.gtag) gtag('event', 'page_view', { page_path: path, page_location: location.origin + '/' + location.hash, page_title: title }); } catch (e) {}
    try { if (window.clarity) clarity('set', 'page', path); } catch (e) {}
  }

  // Old anchor URLs (pre-redesign) → new views, so shared links keep working.
  const LEGACY = { home: 'home', about: 'about', focus: 'about', projects: 'work', bugbounty: 'security', experience: 'experience', credentials: 'experience', blog: 'writing', contact: 'contact' };
  function handleRoute() {
    const h = location.hash;
    const blog = h.match(/^#\/blog\/(.+)$/);
    if (blog) { if (currentView !== 'writing') showView('writing'); openArticle(decodeURIComponent(blog[1])); return; }
    closeArticle();
    const m = h.match(/^#\/([a-z]+)\/?$/);
    const v = m ? m[1] : (LEGACY[h.replace('#', '')] || 'home');
    showView(v);
  }
  window.addEventListener('hashchange', handleRoute);

  const go = id => { if (('#/' + id) === location.hash) showView(id); else location.hash = '#/' + id; };

  /* ============================================================
     LENS STATE
     ============================================================ */
  let currentLens = 'overview';
  let handoffInFlight = false; // true while the intro is flying into the site (suppresses entry theatrics)
  function setLens(id, opts = {}) {
    currentLens = id;
    root.setAttribute('data-lens', id);
    root.setAttribute('data-side', sideForLens(id));
    const t = getTrack(id);
    typeInto($('#homeSub'), t.tagline);
    renderFeatured(id);
    renderBentoLens(id);
    renderFocus(id);
    renderContributions(id);
    renderTerminal(id);
    updateLensControls(id);
    updateNavForLens(id);
    setProjectFilter(id === 'overview' ? 'all' : id);
    renderBlog(id === 'overview' ? 'all' : id); // hard-focus: Writing filtered to the field
    syncBlogFilterPill(id === 'overview' ? 'all' : id);
    $('#aboutSummary').textContent = t.tagline;
    $('#footLens').textContent = t.short;
    if (!opts.silent) flashLens();
  }
  function syncBlogFilterPill(id) {
    $$('#blogFilters .filter').forEach(b => b.classList.toggle('active', b.getAttribute('data-blogfilter') === id));
  }

  // HARD FOCUS: trim the nav to the views the active lens exposes (generalised from the old
  // security-only rule). Home is always reachable; bounce off a now-hidden view.
  function updateNavForLens(id) {
    const allowed = new Set(lensViews(id));
    VIEWS.forEach(v => {
      if (v === 'home') return;
      const link = $(`[data-tab-link="${v}"]`);
      if (link) link.classList.toggle('nav-hidden', !allowed.has(v));
    });
    if (!allowed.has(currentView) && currentView !== 'home') go('home');
  }
  function flashLens() { if (reduce) return; const f = $('#lensFlash'); f.classList.remove('run'); void f.offsetWidth; f.classList.add('run'); }

  let typeTimer = null;
  function typeInto(node, text) {
    clearTimeout(typeTimer);
    if (reduce) { node.textContent = text; return; }
    let i = 0; node.textContent = '';
    (function step() { node.textContent = text.slice(0, i++); if (i <= text.length) typeTimer = setTimeout(step, 14); })();
  }

  /* ---------- lens controls (home segmented bar + nav menu) ---------- */
  function renderLensControls() {
    const all = [DATA.overviewLens, ...DATA.lenses];
    $('#lensBar').innerHTML = all.map(l => `
      <button class="lens-pill" data-lens-pill="${l.id}" role="tab" aria-selected="false" style="--lc:rgb(${l.rgb});--lc-rgb:${l.rgb}">
        <i class="fa-solid ${l.icon}"></i><span>${l.short}</span>
      </button>`).join('');
    $$('#lensBar [data-lens-pill]').forEach(b => b.addEventListener('click', () => setLens(b.getAttribute('data-lens-pill'))));
    $('#lensSwitchMenu').innerHTML = all.map(l => `<button class="lens-switch__opt" data-lens-opt="${l.id}" role="menuitem"><span class="dot" style="background:rgb(${l.rgb})"><i class="fa-solid ${l.icon}"></i></span><span>${l.label}<small>${l.blurb.slice(0, 38)}...</small></span></button>`).join('');
    $$('#lensSwitchMenu [data-lens-opt]').forEach(b => b.addEventListener('click', () => { setLens(b.getAttribute('data-lens-opt')); $('#lensSwitch').classList.remove('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', 'false'); }));
  }
  function updateLensControls(id) {
    $$('#lensBar [data-lens-pill]').forEach(b => {
      const on = b.getAttribute('data-lens-pill') === id;
      b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on));
    });
    $('#lensSwitchLabel').textContent = getTrack(id).short;
    $$('#lensSwitchMenu [data-lens-opt]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lens-opt') === id));
  }
  $('#lensSwitchBtn').addEventListener('click', e => { e.stopPropagation(); const open = $('#lensSwitch').classList.toggle('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', () => { $('#lensSwitch').classList.remove('open'); $('#lensSwitchBtn').setAttribute('aria-expanded', 'false'); });

  /* ============================================================
     HOME - typewriter, bento tiles, marquee
     ============================================================ */
  function typeRoles() {
    const roles = (DATA.roles && DATA.roles.length ? DATA.roles : ['Penetration Tester']);
    const eln = $('#roleType');
    if (reduce) { eln.textContent = 'Software & AI engineer · security · UX'; return; }
    let ri = 0, ci = 0, del = false;
    (function tick() {
      const w = roles[ri];
      eln.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
      let wait = del ? 38 : 68;
      if (!del && ci > w.length) { del = true; wait = 1500; }
      else if (del && ci < 0) { del = false; ci = 0; ri = (ri + 1) % roles.length; wait = 250; }
      setTimeout(tick, wait);
    })();
  }

  const shortTitle = s => s.split(/\s+[- -  - ]\s+/)[0].trim();
  function renderFeatured(id) {
    const t = getTrack(id);
    const p = (t.projects && t.projects[0]) || PROJECTS[0];
    $('#tileProjKicker').innerHTML = `<i class="fa-solid fa-star"></i> Featured · ${t.short}`;
    $('#tileProjBody').innerHTML = `
      <strong class="tile__title">${shortTitle(p.title)}</strong>
      <span class="tile__label">${emphasize((p.metrics && p.metrics[0]) || p.type)}</span>`;
  }

  function renderBento() {
    const post = POSTS[0];
    if (post) {
      $('#tilePost').setAttribute('href', '#/blog/' + post.slug);
      $('#tilePostBody').innerHTML = `
        <strong class="tile__title">${post.title}</strong>
        <span class="tile__label">${fmtDate(post.date)} · ${post.readingTime}</span>`;
    } else { $('#tilePost').style.display = 'none'; }
    // highlights tile may carry a data-exp-tab → open that Experience tab when clicked
    const hi = $('#tileHighlights');
    if (hi) hi.addEventListener('click', () => { const t = hi.getAttribute('data-exp-tab'); if (t) setTimeout(() => setExpTab(t), 60); });
    $$('.bento .tile').forEach(attachTilt);
    const items = DATA.marquee.map(m => `<span>${m}</span>`).join('');
    $('#marquee').innerHTML = items + items;
  }

  // The two headline bento tiles are LENS-AWARE: engineering → projects + impact,
  // AI/ML → AI products + selected work, UI/UX → designs, cybersecurity → findings + credentials.
  const projCount = id => (byId[id] && byId[id].projects ? byId[id].projects.length : 0);
  function bentoConfig(id) {
    const sev = (CONTENT.bugBounty && CONTENT.bugBounty.severity) || [];
    const cred = { kicker: 'Credentials', icon: 'fa-certificate', href: '#/experience', expTab: 'credentials', rows: [
      ['fa-shield-halved', 'OSCP+ · OffSec verified'],
      ['fa-graduation-cap', 'MSc Distinction · Sheffield'],
      ['fa-trophy', '4th of ~9,000 · OffSec Gauntlet'] ] };
    const C = {
      engineering: {
        hero: { kicker: 'Engineering', icon: 'fa-code', href: '#/work', num: '30+', label: 'production systems shipped over 10+ years', chips: ['6.5M req/day', '88% coverage', '99.8% uptime'] },
        hi: { kicker: 'Engineering impact', icon: 'fa-server', href: '#/experience', rows: [
          ['fa-bolt', '6.5M requests/day · 50K+ daily txns'],
          ['fa-vial-circle-check', '88% coverage · −65% incidents'],
          ['fa-layer-group', 'Java · Python · Kafka · .NET · Go'] ] }
      },
      aiml: {
        hero: { kicker: 'AI / ML', icon: 'fa-brain', href: '#/work', num: projCount('aiml'), label: 'AI products - agents, RAG & eval', chips: ['Agents', 'RAG', 'MCP'] },
        hi: { kicker: 'Selected AI work', icon: 'fa-arrow-up-right-from-square', href: '#/work', rows: ((byId.aiml && byId.aiml.contributions) || []).slice(0, 3).map(c => ['fa-circle-nodes', c.label]) }
      },
      uiux: {
        hero: { kicker: 'UI / UX', icon: 'fa-pen-ruler', href: '#/work', num: projCount('uiux'), label: 'product UIs & design systems', chips: ['WCAG 2.2 AA', '60+ components', '98 Lighthouse'] },
        hi: { kicker: 'Design highlights', icon: 'fa-swatchbook', href: '#/work', rows: [
          ['fa-cubes', 'Typed design systems & tokens'],
          ['fa-table-columns', 'Data-dense dashboards & mobile'],
          ['fa-universal-access', 'Accessibility as an engineering constraint'] ] }
      },
      cybersecurity: {
        hero: { kicker: 'Bug bounty', icon: 'fa-bug', href: '#/security', num: (CONTENT.bugBounty ? CONTENT.bugBounty.totalAccepted : 51), label: 'accepted findings, public & private', sev: sev },
        hi: cred
      },
      overview: {
        hero: { kicker: 'Across four disciplines', icon: 'fa-layer-group', href: '#/work', num: PROJECTS.length, label: 'projects across eng, AI, security & UX', chips: ['10+ yrs', 'OSCP+', 'MSc Dist.'] },
        hi: cred
      }
    };
    return C[id] || C.overview;
  }
  function renderBentoLens(id) {
    const cfg = bentoConfig(id), hero = $('#tileHero'), hi = $('#tileHighlights');
    if (hero) {
      hero.setAttribute('href', cfg.hero.href);
      const extra = cfg.hero.sev
        ? `<div class="tile__sev">${cfg.hero.sev.map(s => { const cl = /crit/i.test(s.label) ? 'crit' : /high/i.test(s.label) ? 'high' : /med/i.test(s.label) ? 'med' : 'low'; return `<span class="sevdot ${cl}">${s.count} ${s.label}</span>`; }).join('')}</div>`
        : `<div class="tile__chips">${(cfg.hero.chips || []).map(c => `<span class="tilechip">${c}</span>`).join('')}</div>`;
      hero.innerHTML = `<div class="tile__top"><span class="tile__kicker"><i class="fa-solid ${cfg.hero.icon}"></i> ${cfg.hero.kicker}</span><i class="fa-solid fa-arrow-right tile__go"></i></div>
        <div class="tile__big"><b data-count="${cfg.hero.num}">${cfg.hero.num}</b><span>${cfg.hero.label}</span></div>${extra}`;
    }
    if (hi) {
      hi.setAttribute('href', cfg.hi.href);
      if (cfg.hi.expTab) hi.setAttribute('data-exp-tab', cfg.hi.expTab); else hi.removeAttribute('data-exp-tab');
      hi.innerHTML = `<div class="tile__top"><span class="tile__kicker"><i class="fa-solid ${cfg.hi.icon}"></i> ${cfg.hi.kicker}</span><i class="fa-solid fa-arrow-right tile__go"></i></div>
        <div class="tile__rows">${cfg.hi.rows.map(r => `<span class="tile__row"><i class="fa-solid ${r[0]}"></i> ${r[1]}</span>`).join('')}</div>`;
    }
    countUp($('#view-home'));
  }

  /* ---------- terminal ---------- */
  const TERMS = {
    overview: [['whoami', 'muhammad-ramis - security × engineering', 'ok'], ['cat ./focus', 'cybersecurity · engineering · ai-ml · ui-ux', 'v'], ['./credentials --short', 'OSCP+ · MSc Distinction · 51 accepted findings', 'ok']],
    cybersecurity: [['nmap -sV target', '22 ssh  80 http  443 https  8443 app', 'v'], ['./chain.py --ssrf', 'SSRF → 169.254.169.254 → temp IAM → AD pivot', 'warn'], ['bloodhound --shortest', 'KERBEROAST → ACL ABUSE → DOMAIN ADMIN', 'ok']],
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
     STATIC RENDER (all views)
     ============================================================ */
  function socialLinks() {
    return DATA.profile.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('');
  }
  function stagger(scope) { $$('.rv', scope).forEach((el, i) => el.style.setProperty('--d', String(Math.min(i, 12)))); }

  function renderStatic() {
    $('#homeSocial').innerHTML = socialLinks();
    $('#footSocial').innerHTML = socialLinks();
    // About
    const paras = CONTENT.overview.about.split(/\n\s*\n/);
    const rest = paras.slice(1).join('\n\n');
    $('#aboutProse').innerHTML = mdToHtml(paras[0]) + (rest ? `<div class="pmore" hidden>${mdToHtml(rest)}</div><button class="readmore" id="aboutMore" type="button">Read more <i class="fa-solid fa-chevron-down"></i></button>` : '');
    if (rest) $('#aboutMore').addEventListener('click', function () { const m = $('.pmore'); if (m.hasAttribute('hidden')) { m.removeAttribute('hidden'); this.innerHTML = 'Show less <i class="fa-solid fa-chevron-up"></i>'; } else { m.setAttribute('hidden', ''); this.innerHTML = 'Read more <i class="fa-solid fa-chevron-down"></i>'; } });
    $('#philosophy').innerHTML = CONTENT.overview.philosophy.map(p => `<div class="phi"><span class="phi__ic"><i class="fa-solid fa-${p.icon}"></i></span><div><h4>${p.title}</h4><p>${p.text}</p></div></div>`).join('');
    $('#aboutStats').innerHTML = OVERVIEW.stats.map(s => `<div class="stat"><div class="stat__num" data-count="${s.value}">${s.value}</div><div class="stat__label">${s.label}</div></div>`).join('');
    renderProjectsOnce();
    renderBugBounty();
    renderTimeline();
    renderCredentials();
    renderBlogFilters();
    renderBlog('all');
    renderContact();
    renderLensControls();
    renderBento();
    renderIntroCards();
    typeRoles();
    $$('.view').forEach(stagger);
  }

  // The "choose your side" cards (single-sourced from DATA) - work with or without the 3D scene.
  function renderIntroCards() {
    const host = $('#introCards'); if (!host) return;
    const STAT = { engineering: '6.5M req/day', aiml: 'agents · RAG', cybersecurity: '51 findings', uiux: 'WCAG 2.2 AA' };
    const emblem = id => `<span class="intro-card__ic intro-card__ic--emblem"><img class="intro-card__emblem" src="assets/img/emblems/${id}.svg" alt="" width="64" height="64" loading="lazy"></span>`;
    const card = (l, side) => `<button class="intro-card" data-side="${side}" type="button" style="--lc:rgb(${l.rgb});--lc-rgb:${l.rgb};--lc2:rgb(${l.rgb2})">
        ${emblem(l.id)}
        <span class="intro-card__label">${l.short}</span>
        <span class="intro-card__blurb">${l.blurb}</span>
        <span class="intro-card__stat">${STAT[side] || ''}</span>
      </button>`;
    const allCard = `<button class="intro-card intro-card--all intro-card--primary" data-side="everything" type="button" style="--lc:rgb(${DATA.overviewLens.rgb});--lc-rgb:${DATA.overviewLens.rgb};--lc2:rgb(${DATA.overviewLens.rgb2})">
        ${emblem('everything')}
        <span class="intro-card__label">View the full portfolio</span>
        <span class="intro-card__blurb">New here, or not sure where to look? See everything in one place.</span>
        <span class="intro-card__stat">recommended <i class="fa-solid fa-arrow-right"></i></span>
      </button>`;
    const contactCard = `<button class="intro-card intro-card--contact" data-side="everything" data-go="contact" type="button">
        <span class="intro-card__ic"><i class="fa-solid fa-paper-plane"></i></span>
        <span class="intro-card__label">Work with me</span>
        <span class="intro-card__blurb">Hire, contract or consult - jump straight to contact.</span>
      </button>`;
    host.innerHTML = allCard +
      `<p class="intro__pick">or jump straight to a specialism</p>` +
      DATA.lenses.map(l => card(l, l.id)).join('') +
      contactCard;
  }

  /* ---------- FOCUS (about view, lens-aware) ---------- */
  function renderFocus(id) {
    const t = getTrack(id);
    $('#focusHead').innerHTML = `<i class="fa-solid fa-crosshairs"></i> ${t.short} - focus & toolkit`;
    $('#focusAreas').innerHTML = `<h3><i class="fa-solid fa-crosshairs"></i> What I work on <span style="color:var(--text-faint);font-weight:400;font-size:.78rem"> - tap to expand</span></h3>
      <div class="focus-tiles">${t.focusAreas.map(f => `<button class="ftile" type="button"><span class="ftile__top"><span class="ic"><i class="fa-solid ${focusIcon(f)}"></i></span><span class="ftile__lbl">${shortLabel(f)}</span><i class="fa-solid fa-chevron-down chev"></i></span><span class="ftile__full">${f}</span></button>`).join('')}</div>`;
    $$('#focusAreas .ftile').forEach(b => b.addEventListener('click', () => b.classList.toggle('open')));
    $('#focusTools').innerHTML = `<h3><i class="fa-solid fa-toolbox"></i> Tools & tech I reach for</h3><div class="tags">${t.tools.map(x => `<span class="tag">${x}</span>`).join('')}</div>`;
  }
  function shortLabel(s) {
    let base = s.split('(')[0].replace(/\s[ - -]\s.*$/, '').trim();
    const parts = base.split(/,| and | & /);
    let lab = parts[0].trim();
    if (lab.length < 16 && parts[1]) lab += ', ' + parts[1].trim();
    lab = lab.replace(/\s+/g, ' ');
    if (lab.length > 40) lab = lab.slice(0, 38).replace(/[ ,]+$/, '') + '...';
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

  /* ---------- PROJECTS (work view) ---------- */
  function renderProjectsOnce() {
    const filters = [{ id: 'all', label: 'All', icon: 'fa-layer-group' }, ...DATA.lenses.map(l => ({ id: l.id, label: l.short, icon: l.icon }))];
    $('#projectFilters').innerHTML = filters.map(f => `<button class="filter" data-filter="${f.id}"><i class="fa-solid ${f.icon}"></i> ${f.label}</button>`).join('');
    $$('#projectFilters .filter').forEach(b => b.addEventListener('click', () => setProjectFilter(b.getAttribute('data-filter'))));
    $('#projectGrid').innerHTML = PROJECTS.map((p, idx) => {
      const stack = p.stack || [];
      const chips = stack.slice(0, 4).map(s => `<span>${s}</span>`).join('') + (stack.length > 4 ? `<span class="more">+${stack.length - 4}</span>` : '');
      const peek = (((p.blurb || '').match(/^[\s\S]*?[.!?](\s|$)/) || [p.blurb || ''])[0]).trim();
      return `<article class="proj rv${p.shot ? ' has-cover' : ''}" data-lenses="${p.lenses.join(' ')}" data-idx="${idx}" tabindex="0" role="button" aria-label="${p.title} - open details">
        ${coverHTML(p)}
        <div class="proj__body">
          <div class="proj__top"><span class="proj__ic"><i class="fa-solid ${projIcon(p)}"></i></span><span class="proj__type">${p.type}</span>${p.shot ? '' : roleBadge(p)}</div>
          <h3 class="proj__title">${p.title}</h3>
          <div class="proj__stat"><i class="fa-solid fa-bolt ic"></i><span>${emphasize((p.metrics && p.metrics[0]) || '')}</span></div>
          <div class="proj__stack">${chips}</div>
          <button class="proj__more" type="button" tabindex="-1">View details <i class="fa-solid fa-arrow-right"></i></button>
          <div class="proj__peek">${peek}</div>
        </div>
      </article>`;
    }).join('');
    $$('#projectGrid .proj').forEach(card => {
      attachTilt(card);
      const open = () => openProjectModal(+card.getAttribute('data-idx'));
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }
  function openProjectModal(idx) {
    const p = PROJECTS[idx]; if (!p) return;
    const links = Object.entries(p.links || {}).filter(([, v]) => v).map(([k, v]) => {
      const ic = k === 'repo' ? 'fa-brands fa-github' : k === 'demo' ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-solid fa-book-open';
      const lbl = k === 'repo' ? 'Code' : k === 'demo' ? 'Live' : 'Write-up';
      return `<a href="${v}" target="_blank" rel="noopener"><i class="${ic}"></i> ${lbl}</a>`;
    }).join('');
    const roleLine = p.role ? `<span class="modal__role${isFork(p.role) ? ' is-fork' : ''}"><i class="fa-solid ${isFork(p.role) ? 'fa-code-fork' : 'fa-star'}"></i> ${p.role}</span>` : '';
    $('#projModalBody').innerHTML = `${p.shot ? `<div class="modal__cover"><img src="${SHOT_BASE}${p.shot}.svg" alt="${escAttr(p.title)} interface preview" loading="lazy" />${roleLine}</div>` : ''}
      <span class="modal__ic"><i class="fa-solid ${projIcon(p)}"></i></span>
      <span class="modal__type">${p.type} · ${p.lenses.map(l => lensMeta(l).short).join(' · ')}${p.shot ? '' : (roleLine ? ' · ' + p.role : '')}</span>
      <h3 class="modal__title">${p.title}</h3>
      <p class="modal__blurb">${p.blurb}</p>
      ${p.note ? `<p class="modal__note"><i class="fa-solid fa-circle-info"></i> ${p.note}</p>` : ''}
      <div class="modal__metrics">${(p.metrics || []).map(m => `<div><i class="fa-solid fa-check"></i><span>${m}</span></div>`).join('')}</div>
      <div class="proj__stack" style="margin-bottom:1.3rem">${(p.stack || []).map(s => `<span>${s}</span>`).join('')}</div>
      <div class="proj__links">${links}</div>`;
    const m = $('#projModal'); m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  }
  function closeProjectModal() { const m = $('#projModal'); m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); if (!$('#article').classList.contains('open') && !$('#cmdk').classList.contains('open')) document.body.style.overflow = ''; }
  const PAGE = 6;
  let projFilterId = 'all', projShown = PAGE;
  function setProjectFilter(id) {
    projFilterId = id; projShown = PAGE;
    $$('#projectFilters .filter').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === id));
    paintProjects(true);
  }
  function loadMoreProjects() { projShown += PAGE; paintProjects(false); }
  function paintProjects(reset) {
    const cards = $$('#projectGrid .proj');
    let matched = 0; const newly = [];
    cards.forEach(card => {
      const ok = projFilterId === 'all' || card.getAttribute('data-lenses').split(' ').includes(projFilterId);
      if (!ok) { card.style.display = 'none'; return; }
      matched++;
      const show = matched <= projShown;
      const was = card.style.display !== 'none';
      card.style.display = show ? '' : 'none';
      if (show && (reset || !was)) newly.push(card);
    });
    newly.forEach(c => { c.classList.remove('in'); c.style.animationDelay = ''; });
    if (newly.length) void newly[0].offsetWidth; // reflow → restart keyframe animation
    newly.forEach((c, i) => { c.style.animationDelay = reduce ? '0ms' : (Math.min(i, 8) * 45) + 'ms'; c.classList.add('in'); });
    const more = $('#projMore');
    if (more) {
      if (matched > projShown) { more.hidden = false; $('#projCount').textContent = `Showing ${projShown} of ${matched} projects`; }
      else more.hidden = true;
    }
  }
  function renderContributions(id) {
    const list = getTrack(id).contributions || [];
    $('#contributions').innerHTML = !list.length ? '' : `<div class="panel"><h3><i class="fa-solid fa-link"></i> Selected contributions & links</h3>
      <div class="focus-list">${list.map(c => `<a class="focus-item" href="${c.url}" target="_blank" rel="noopener" style="text-decoration:none"><i class="fa-solid fa-arrow-up-right-from-square"></i><span><b style="color:var(--text)">${c.label}</b><br><span style="font-size:.86rem">${c.note}</span></span></a>`).join('')}</div></div>`;
  }

  /* ---------- BUG BOUNTY (security view) ---------- */
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
    $('#bugBounty').innerHTML = `<div class="bb rv">
      <div class="panel">
        <div class="bb__total"><b data-count="${bb.totalAccepted}">${bb.totalAccepted}</b><span>accepted findings across ${bb.programs.length} public programs</span></div>
        <div class="bb__prog">${programs}</div>
        <div class="bb__sev">${sev}</div>
      </div>
      <div class="panel"><h3><i class="fa-solid fa-crosshairs"></i> Representative findings <span style="color:var(--text-faint);font-weight:400;font-size:.78rem"> - tap to expand</span></h3><div class="bb__hl">${hl}</div></div>
    </div>`;
    $$('#bugBounty .bb__hlcard').forEach(b => b.addEventListener('click', () => b.classList.toggle('open')));
  }

  /* ---------- EXPERIENCE (timeline + tabs) ---------- */
  function renderTimeline() {
    $('#timeline').innerHTML = DATA.experience.map((e, i) => `<div class="tl-item ${i % 2 === 0 ? 'left' : 'right'} rv" style="--d:${i}">
      <span class="tl-dot"></span>
      <div class="tl-card"><span class="tl-when">${e.period}</span><h3 class="tl-role">${e.role}</h3><p class="tl-co"><b>${e.company}</b>${e.location ? ` · <span class="tl-loc">${e.location}</span>` : ''}</p>
      <p class="tl-desc">${e.desc}</p>
      <div class="tl-badges">${(e.metrics || []).map(m => `<span class="tl-badge">${m}</span>`).join('')}</div>
      <button class="tl-toggle" type="button">Details <i class="fa-solid fa-chevron-down"></i></button>
      <div class="tl-details"><ul class="tl-points">${e.points.map(p => `<li><i class="fa-solid fa-angle-right"></i><span>${p}</span></li>`).join('')}</ul>
      <div class="tl-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div></div></div></div>`).join('');
    $$('#timeline .tl-toggle').forEach(btn => btn.addEventListener('click', () => btn.closest('.tl-item').classList.toggle('open')));
  }
  function renderCredentials() {
    const cards = [];
    DATA.certifications.forEach(c => {
      const status = c.status === 'verified'
        ? `<a class="cert__status verified" href="${c.url}" target="_blank" rel="noopener"><i class="fa-solid fa-circle-check"></i> Verified</a>`
        : `<span class="cert__status progress"><i class="fa-solid fa-hourglass-half"></i> In progress</span>`;
      cards.push(`<div class="cert rv"><div class="cert__badge"><i class="fa-solid ${c.icon}"></i></div><div class="cert__name">${c.name}</div><div class="cert__full">${c.full}</div><div class="cert__org">${c.org}</div><div class="cert__date">${c.date}</div>${status}<p class="cert__desc">${c.desc}</p></div>`);
    });
    DATA.education.forEach(e => {
      cards.push(`<div class="cert rv"><div class="cert__badge"><i class="fa-solid ${e.icon}"></i></div><div class="cert__name">${e.name}</div><div class="cert__full">${e.org}</div><div class="cert__org">${e.grade}</div><div class="cert__date">${e.date}</div><span class="cert__status verified"><i class="fa-solid fa-graduation-cap"></i> ${e.grade}</span><p class="cert__desc">${e.desc}</p></div>`);
    });
    $('#certGrid').innerHTML = cards.join('');
    $('#achGrid').innerHTML = DATA.achievements.map(a => `<div class="ach rv"><span class="ach__ic"><i class="fa-solid ${a.icon}"></i></span><div><h4>${a.title}</h4><div class="ach__meta">${a.meta}</div><p>${a.desc}</p></div></div>`).join('');
  }
  function setExpTab(id) {
    $$('#expTabs .tab').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === id));
    let pane;
    $$('#view-experience .tabpane').forEach(p => { const on = p.getAttribute('data-pane') === id; p.classList.toggle('active', on); if (on) pane = p; });
    revealScope(pane);
  }
  $$('#expTabs .tab').forEach(b => b.addEventListener('click', () => setExpTab(b.getAttribute('data-tab'))));

  /* ---------- BLOG (writing view) ---------- */
  const lensName = id => (DATA.lenses.find(l => l.id === id) || { short: id === 'research' ? 'Research' : 'Overview' }).short;
  const TRACK_RGB = { cybersecurity: '224,85,109', engineering: '111,120,214', aiml: '47,179,137', uiux: '176,105,224', research: '47,179,137' };
  const trackRgb = t => TRACK_RGB[t] || '92,198,221';
  function renderBlogFilters() {
    const filters = [{ id: 'all', label: 'All' }, ...DATA.lenses.map(l => ({ id: l.id, label: l.short })), { id: 'research', label: 'Research' }];
    $('#blogFilters').innerHTML = filters.map((f, i) => `<button class="filter${i === 0 ? ' active' : ''}" data-blogfilter="${f.id}">${f.label}</button>`).join('');
    $$('#blogFilters .filter').forEach(b => b.addEventListener('click', () => { $$('#blogFilters .filter').forEach(x => x.classList.remove('active')); b.classList.add('active'); renderBlog(b.getAttribute('data-blogfilter')); }));
  }
  let blogFilterId = 'all', blogShown = PAGE;
  function renderBlog(filter) { blogFilterId = filter; blogShown = PAGE; paintBlog(); }
  function loadMoreBlog() { blogShown += PAGE; paintBlog(); }
  function paintBlog() {
    const posts = POSTS.filter(p => blogFilterId === 'all' || p.track === blogFilterId);
    const slice = posts.slice(0, blogShown);
    $('#blogGrid').innerHTML = slice.map(p => `<article class="post rv" data-slug="${p.slug}" style="--pc:${trackRgb(p.track)}">
      <div class="post__meta"><span class="post__lens">${lensName(p.track)}</span><span>${fmtDate(p.date)}</span><span>· ${p.readingTime}</span></div>
      <h3 class="post__title">${p.title}</h3><p class="post__excerpt">${p.excerpt}</p>
      <div class="post__tags">${(p.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <span class="post__more">Read article <i class="fa-solid fa-arrow-right"></i></span></article>`).join('') || `<p style="color:var(--text-dim)">No posts in this category yet.</p>`;
    const posts2 = $$('#blogGrid .post');
    posts2.forEach(c => c.addEventListener('click', () => { location.hash = '#/blog/' + c.getAttribute('data-slug'); }));
    if (posts2.length) void posts2[0].offsetWidth; // reflow → restart keyframe animation
    posts2.forEach((c, i) => { c.style.animationDelay = reduce ? '0ms' : (Math.min(i, 8) * 45) + 'ms'; c.classList.add('in'); });
    const more = $('#blogMore');
    if (more) {
      if (posts.length > blogShown) { more.hidden = false; $('#blogCount').textContent = `Showing ${blogShown} of ${posts.length} articles`; }
      else more.hidden = true;
    }
  }
  function fmtDate(d) {
    const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [y, m, day] = d.split('-'); return `${parseInt(day, 10)} ${M[parseInt(m, 10) - 1]} ${y}`;
  }

  /* ---------- CONTACT ---------- */
  function email() { return DATA.profile.emailUser + '@' + DATA.profile.emailDomain; }
  function renderContact() {
    const p = DATA.profile;
    $('#contactInfo').innerHTML = `
      <div class="contact-avail"><i class="fa-solid fa-circle-check"></i> Available for consultancy &amp; contract work, and open to hire</div>
      <button class="contact-line reveal-email" id="revealEmail" type="button"><i class="fa-solid fa-envelope"></i><span><small>Email</small><span class="masked">click to reveal</span></span></button>
      <div class="contact-line"><i class="fa-solid fa-location-dot"></i><span><small>Based in</small>${p.location}</span></div>
      <div class="contact-line"><i class="fa-solid fa-briefcase"></i><span><small>Status</small>${p.availability}</span></div>
      <div class="home__social" style="margin-top:1.4rem">${socialLinks()}</div>`;
    $('#revealEmail').addEventListener('click', function () {
      const e = email();
      this.outerHTML = `<a class="contact-line" href="mailto:${e}"><i class="fa-solid fa-envelope"></i><span><small>Email</small>${e}</span></a>`;
    });
    $('#contactForm').addEventListener('submit', e => {
      e.preventDefault(); const f = e.target;
      const topic = f.topic.value || 'Project inquiry';
      const subject = encodeURIComponent(`${topic} - inquiry via ramis.me`);
      const lines = [
        f.message.value, '',
        `Name: ${f.name.value}`,
        `Email: ${f.email.value}`,
        f.phone.value ? `Phone: ${f.phone.value}` : '',
        f.company.value ? `Company: ${f.company.value}` : '',
        `Looking for: ${topic}`
      ].filter(Boolean);
      window.location.href = `mailto:${email()}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
      toast('Opening your email client...'); f.reset();
    });
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
     ARTICLE OVERLAY
     ============================================================ */
  function openArticle(slug) {
    const post = POSTS.find(p => p.slug === slug);
    if (!post) { closeArticle(); return; }
    $('#articleBody').innerHTML = `<div class="article__head"><span class="eyebrow">${lensName(post.track)} · ${post.readingTime}</span>
      <h1>${post.title}</h1>
      <div class="article__meta"><span><i class="fa-solid fa-calendar"></i> ${fmtDate(post.date)}</span><span><i class="fa-solid fa-user"></i> Muhammad Ramis</span><span>${(post.tags || []).map(t => `#${t}`).join('  ')}</span></div></div>
      <div class="md">${mdToHtml(post.body)}</div>
      <div style="margin-top:3rem"><a class="btn btn-ghost" href="#/writing"><i class="fa-solid fa-arrow-left"></i> Back to all posts</a></div>`;
    const a = $('#article'); a.classList.add('open'); a.setAttribute('aria-hidden', 'false'); a.scrollTop = 0; document.body.style.overflow = 'hidden';
    document.title = `${post.title} - Muhammad Ramis`;
    trackView('/blog/' + slug, document.title);
  }
  function closeArticle() {
    const a = $('#article'); if (!a.classList.contains('open')) return;
    a.classList.remove('open'); a.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
  }

  /* ============================================================
     COUNTERS / BARS
     ============================================================ */
  function fillBars(scope) { $$('.bb__bar span', scope).forEach(s => { s.style.width = (s.dataset.w || 0) + '%'; }); }
  function countUp(scope) {
    $$('[data-count]', scope).forEach(node => {
      if (node.dataset.done) return;
      const raw = node.getAttribute('data-count'); const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
      node.dataset.done = '1';
      if (!m || reduce) return;
      const pre = m[1], target = parseFloat(m[2].replace(/,/g, '')), post = m[3], dec = (m[2].split('.')[1] || '').length;
      const start = performance.now(), dur = 1100;
      (function frame(t) { const p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3), val = target * e; node.textContent = pre + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString()) + post; if (p < 1) requestAnimationFrame(frame); else node.textContent = pre + m[2] + post; })(start);
    });
  }

  /* ============================================================
     COMMAND PALETTE
     ============================================================ */
  const cmdk = $('#cmdk'), cmdkInput = $('#cmdkInput'), cmdkList = $('#cmdkList');
  let cmdkItems = [], cmdkSel = 0;

  function buildCmdkItems() {
    const items = [];
    const nav = { home: 'fa-house', about: 'fa-user', work: 'fa-folder-open', security: 'fa-bug', experience: 'fa-briefcase', writing: 'fa-feather', contact: 'fa-paper-plane' };
    const allowed = lensViews(currentLens);
    VIEWS.forEach((v, i) => {
      if (!allowed.includes(v)) return; // hard-focus: don't offer hidden views
      items.push({ group: 'Go to', label: v === 'home' ? 'Home' : VIEW_TITLES[v], hint: `${i + 1}`, icon: nav[v], run: () => go(v) });
    });
    [DATA.overviewLens, ...DATA.lenses].forEach(l => items.push({ group: 'Switch lens', label: l.label, hint: l.blurb.slice(0, 60) + '...', icon: l.icon, run: () => setLens(l.id) }));
    items.push({ group: 'Actions', label: 'Toggle light / dark theme', icon: 'fa-circle-half-stroke', run: toggleTheme });
    items.push({ group: 'Actions', label: 'Copy email address', icon: 'fa-envelope', run: () => { navigator.clipboard && navigator.clipboard.writeText(email()); toast('Email copied to clipboard'); } });
    items.push({ group: 'Fun', label: 'Play: Packet Runner', hint: 'WebGL mini-game · opens /play in a new tab', icon: 'fa-gamepad', run: () => window.open('/play/', '_blank', 'noopener') });
    PROJECTS.forEach((p, idx) => items.push({ group: 'Projects', label: shortTitle(p.title), hint: p.type, icon: projIcon(p), run: () => { go('work'); setTimeout(() => openProjectModal(idx), 120); } }));
    POSTS.forEach(p => items.push({ group: 'Writing', label: p.title, hint: `${fmtDate(p.date)} · ${p.readingTime}`, icon: 'fa-feather', run: () => { location.hash = '#/blog/' + p.slug; } }));
    return items;
  }

  function renderCmdk(q) {
    q = (q || '').trim().toLowerCase();
    cmdkItems = buildCmdkItems().filter(it => !q || (it.label + ' ' + (it.hint || '') + ' ' + it.group).toLowerCase().includes(q)).slice(0, 14);
    cmdkSel = 0;
    if (!cmdkItems.length) { cmdkList.innerHTML = `<div class="cmdk__empty">No matches - try “work”, “lens” or a project name.</div>`; return; }
    let html = '', lastGroup = null;
    cmdkItems.forEach((it, i) => {
      if (it.group !== lastGroup) { html += `<div class="cmdk__group">${it.group}</div>`; lastGroup = it.group; }
      html += `<button class="cmdk__item${i === 0 ? ' sel' : ''}" data-ci="${i}" role="option"><i class="fa-solid ${it.icon}"></i><span>${it.label}${it.hint ? `<small>${it.hint}</small>` : ''}</span></button>`;
    });
    cmdkList.innerHTML = html;
    $$('.cmdk__item', cmdkList).forEach(b => {
      b.addEventListener('click', () => runCmdk(+b.getAttribute('data-ci')));
      b.addEventListener('pointerenter', () => selectCmdk(+b.getAttribute('data-ci')));
    });
  }
  function selectCmdk(i) {
    cmdkSel = Math.max(0, Math.min(i, cmdkItems.length - 1));
    $$('.cmdk__item', cmdkList).forEach(b => b.classList.toggle('sel', +b.getAttribute('data-ci') === cmdkSel));
    const el = $(`.cmdk__item[data-ci="${cmdkSel}"]`, cmdkList); if (el) el.scrollIntoView({ block: 'nearest' });
  }
  function runCmdk(i) { const it = cmdkItems[i]; if (!it) return; closeCmdk(); it.run(); }
  function openCmdk() { cmdk.classList.add('open'); cmdk.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; cmdkInput.value = ''; renderCmdk(''); setTimeout(() => cmdkInput.focus(), 30); }
  function closeCmdk() { cmdk.classList.remove('open'); cmdk.setAttribute('aria-hidden', 'true'); if (!$('#article').classList.contains('open') && !$('#projModal').classList.contains('open')) document.body.style.overflow = ''; }
  $('#cmdkBtn').addEventListener('click', openCmdk);
  $('[data-cmdk-close]').addEventListener('click', closeCmdk);
  cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));
  cmdkInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); selectCmdk(cmdkSel + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectCmdk(cmdkSel - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); runCmdk(cmdkSel); }
  });

  /* ============================================================
     KEYBOARD SHORTCUTS
     ============================================================ */
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdk.classList.contains('open') ? closeCmdk() : openCmdk(); return; }
    if (e.key === 'Escape') { closeCmdk(); closeProjectModal(); if ($('#article').classList.contains('open')) location.hash = '#/writing'; return; }
    const typing = /^(input|textarea|select)$/i.test((e.target.tagName || '')) || e.target.isContentEditable;
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (cmdk.classList.contains('open') || $('#article').classList.contains('open') || $('#projModal').classList.contains('open') || document.body.classList.contains('snake-on') || document.body.classList.contains('intro-open')) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= VIEWS.length) go(VIEWS[n - 1]);
  });

  /* ============================================================
     SNAKE - home easter egg: a mouse-controlled snake that eats the page
     ============================================================ */
  (function snakeMode() {
    const fab = $('#snakeFab'); if (!fab) return;
    let on = false, cv, ctx, raf, segs, foods, crumbs, dust, eaten, hud, ate;
    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const rgbVar = (n) => (getComputedStyle(root).getPropertyValue(n).trim() || '110,231,255');
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const resize = () => { if (cv) { cv.width = innerWidth; cv.height = innerHeight; } };

    const SPEED = 5;     // px/frame - a calm crawl toward the cursor, not a whip
    const SPACING = 8;   // gap between body segments
    const HEAD_R = 13;

    function gatherFood() {
      const sel = '#view-home .tile, #view-home .chip, #view-home .lens-pill, #view-home .stat, #view-home .home__social a, #view-home .marquee__track span, .nav__links a:not(.nav-hidden), .brand, #cmdkBtn';
      const list = [];
      $$(sel).forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width < 6 || r.height < 6 || r.bottom < 0 || r.top > innerHeight || r.left > innerWidth) return;
        list.push({ el, r, shattered: false });
      });
      return list;
    }
    function elColor(el) {
      const cs = getComputedStyle(el);
      let c = cs.backgroundColor;
      if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') c = cs.color;
      const m = c.match(/(\d+)\D+(\d+)\D+(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    }
    // Break an element into a grid of little "lego" blocks the snake can nibble.
    function shatter(f) {
      f.shattered = true;
      const el = f.el, r = el.getBoundingClientRect();
      const cell = 15;
      const cols = Math.max(1, Math.min(44, Math.round(r.width / cell)));
      const rows = Math.max(1, Math.min(18, Math.round(r.height / cell)));
      const cw = r.width / cols, ch = r.height / rows;
      const acc = rgbVar('--accent-rgb').split(',').map(Number);
      const base = elColor(el) || acc;
      for (let yy = 0; yy < rows; yy++) for (let xx = 0; xx < cols; xx++) {
        const j = 0.72 + Math.random() * 0.5;
        const col = [Math.min(255, (base[0] * .45 + acc[0] * .55) * j) | 0, Math.min(255, (base[1] * .45 + acc[1] * .55) * j) | 0, Math.min(255, (base[2] * .45 + acc[2] * .55) * j) | 0];
        crumbs.push({ x: r.left + xx * cw, y: r.top + yy * ch, w: cw, h: ch, cx: r.left + xx * cw + cw / 2, cy: r.top + yy * ch + ch / 2, col });
      }
      el.classList.add('snake-crumbled'); eaten.push(el);
    }
    function dropDust(c) {
      const n = 2 + (Math.random() * 2 | 0);
      for (let i = 0; i < n; i++) dust.push({ x: c.cx + (Math.random() - .5) * c.w, y: c.cy + (Math.random() - .5) * c.h, vx: (Math.random() - .5) * 1.3, vy: Math.random() * -0.6, life: 1, col: c.col, s: 1.5 + Math.random() * 2.6 });
    }

    function start() {
      if (on) return; on = true;
      document.body.classList.add('snake-on');
      cv = document.createElement('canvas'); cv.className = 'snake-cv'; document.body.appendChild(cv);
      ctx = cv.getContext('2d'); resize();
      segs = []; for (let i = 0; i < 26; i++) segs.push({ x: mouse.x, y: mouse.y + i * SPACING });
      foods = gatherFood(); crumbs = []; dust = []; eaten = []; ate = 0;
      hud = document.createElement('div'); hud.className = 'snake-hud';
      hud.innerHTML = `<span class="snake-hud__score">🐍 <b id="snakeScore">0</b> crumbs eaten</span><button class="snake-hud__exit" id="snakeExit" type="button">Esc to exit</button>`;
      document.body.appendChild(hud);
      $('#snakeExit').addEventListener('click', stop);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('resize', resize);
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (!on) return; on = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      eaten.forEach(el => el.classList.remove('snake-crumbled'));
      if (cv) cv.remove(); if (hud) hud.remove(); cv = hud = ctx = null;
      document.body.classList.remove('snake-on');
    }

    function loop() {
      if (!on) return;
      const rgb = rgbVar('--accent-rgb'), rgb2 = rgbVar('--accent-2-rgb');
      // head crawls toward the cursor at a steady speed
      const head = segs[0];
      const dx = mouse.x - head.x, dy = mouse.y - head.y, d = Math.hypot(dx, dy);
      if (d > 1) { const step = Math.min(d, SPEED); head.x += dx / d * step; head.y += dy / d * step; }
      // body keeps a fixed distance behind the segment in front → smooth crawl
      for (let i = 1; i < segs.length; i++) {
        const p = segs[i - 1], s = segs[i], ax = s.x - p.x, ay = s.y - p.y, ad = Math.hypot(ax, ay) || 1;
        s.x = p.x + ax / ad * SPACING; s.y = p.y + ay / ad * SPACING;
      }
      // shatter elements the head reaches into blocks
      for (const f of foods) {
        if (f.shattered) continue; const r = f.r;
        if (head.x > r.left - HEAD_R && head.x < r.right + HEAD_R && head.y > r.top - HEAD_R && head.y < r.bottom + HEAD_R) shatter(f);
      }
      // eat blocks under the front of the snake; each bite drops dust
      const reach = HEAD_R + 6;
      for (let i = crumbs.length - 1; i >= 0; i--) {
        const c = crumbs[i]; let hit = false;
        for (let k = 0; k < 4 && k < segs.length; k++) { if (Math.abs(segs[k].x - c.cx) < reach && Math.abs(segs[k].y - c.cy) < reach) { hit = true; break; } }
        if (hit) { dropDust(c); crumbs.splice(i, 1); ate++; if (ate % 3 === 0) { const tl = segs[segs.length - 1]; segs.push({ x: tl.x, y: tl.y }); } }
      }
      if (ate) { const sc = $('#snakeScore'); if (sc) sc.textContent = ate; }

      ctx.clearRect(0, 0, cv.width, cv.height);
      // lego blocks
      for (const c of crumbs) { ctx.fillStyle = `rgba(${c.col[0]},${c.col[1]},${c.col[2]},.92)`; ctx.fillRect(c.x + .5, c.y + .5, c.w - 1, c.h - 1); }
      // falling dust
      for (let i = dust.length - 1; i >= 0; i--) {
        const p = dust[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.life -= 0.016;
        if (p.life <= 0 || p.y > innerHeight) { dust.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = `rgb(${p.col[0]},${p.col[1]},${p.col[2]})`; ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
      // snake body
      for (let i = segs.length - 1; i >= 0; i--) {
        const s = segs[i], t = 1 - i / segs.length, rad = 4 + t * 8;
        ctx.beginPath(); ctx.arc(s.x, s.y, rad + 4, 0, 6.283); ctx.fillStyle = `rgba(${rgb},${0.1 * t})`; ctx.fill();
        ctx.beginPath(); ctx.arc(s.x, s.y, rad, 0, 6.283); ctx.fillStyle = i === 0 ? `rgb(${rgb2})` : `rgba(${rgb},${0.5 + 0.5 * t})`; ctx.fill();
      }
      const h2 = segs[0], ex = mouse.x - h2.x, ey = mouse.y - h2.y, ed = Math.hypot(ex, ey) || 1, nx = ex / ed, ny = ey / ed;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(h2.x + nx * 4 - ny * 5, h2.y + ny * 4 + nx * 5, 2.4, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.arc(h2.x + nx * 4 + ny * 5, h2.y + ny * 4 - nx * 5, 2.4, 0, 6.283); ctx.fill();
      raf = requestAnimationFrame(loop);
    }

    fab.addEventListener('click', start);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && on) stop(); });
  })();

  /* ============================================================
     INTERACTIVITY
     ============================================================ */
  function attachTilt(node) {
    if (reduce) return;
    node.addEventListener('pointermove', e => {
      const r = node.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      node.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-5px)`;
    });
    node.addEventListener('pointerleave', () => { node.style.transform = ''; });
  }
  if (!reduce) {
    window.addEventListener('pointermove', e => { root.style.setProperty('--mx', e.clientX + 'px'); root.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
  }

  /* ---------- interactive 3D (WebGL) background - rotating particle orb ---------- */
  (function initFx() {
    const cv = document.getElementById('bgFx');
    if (!cv || reduce) return;
    // viewfx.js owns the 3D background (per-view morphing point-cloud) when WebGL is available;
    // here we only add the lightweight 2D constellation as a no-WebGL ambient fallback.
    let glOk = false; try { glOk = !!document.createElement('canvas').getContext('webgl'); } catch (e) {}
    if (!glOk) init2D(cv);
  })();

  function accentVec() {
    const c = (getComputedStyle(root).getPropertyValue('--accent-rgb').trim() || '110,231,255').split(',').map(n => parseFloat(n) / 255);
    return (c.length === 3 && c.every(x => x === x)) ? c : [0.43, 0.9, 1];
  }

  function initWebGL(cv) {
    let gl;
    try { gl = cv.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: 'low-power' }) || cv.getContext('experimental-webgl'); } catch (e) { return false; }
    if (!gl) return false;

    const VS = `
      attribute vec3 a_pos;
      uniform mat4 u_rot; uniform float u_aspect; uniform float u_size;
      varying float v_depth;
      void main() {
        vec4 p = u_rot * vec4(a_pos, 1.0);
        float persp = 1.0 / (2.2 - p.z * 0.6);
        vec2 pos = p.xy * persp * 1.28;
        pos.x /= u_aspect;
        gl_Position = vec4(pos, 0.0, 1.0);
        v_depth = p.z;
        gl_PointSize = u_size * persp * (0.7 + 0.5 * (p.z + 1.0));
      }`;
    const FS = `
      precision mediump float;
      uniform vec3 u_color; varying float v_depth;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        float r2 = dot(d, d);
        if (r2 > 0.25) discard;
        float a = smoothstep(0.25, 0.0, r2);
        float fog = clamp((v_depth + 1.2) * 0.42, 0.12, 1.0);
        gl_FragColor = vec4(u_color, a * fog * 0.55);
      }`;
    function compile(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
    const vs = compile(gl.VERTEX_SHADER, VS), fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return false;
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);

    const N = innerWidth < 700 ? 1600 : 3400;
    const arr = new Float32Array(N * 3);
    const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle → even sphere distribution
    for (let i = 0; i < N; i++) {
      const y = 1 - (i + 0.5) / N * 2;          // -1..1
      const rad = Math.sqrt(1 - y * y);
      const th = GA * i;
      const shell = 0.64 + Math.random() * 0.46; // radial jitter → 3D volume
      arr[i * 3] = Math.cos(th) * rad * shell;
      arr[i * 3 + 1] = y * shell;
      arr[i * 3 + 2] = Math.sin(th) * rad * shell;
    }
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos'); gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    const uRot = gl.getUniformLocation(prog, 'u_rot'), uAspect = gl.getUniformLocation(prog, 'u_aspect'), uSize = gl.getUniformLocation(prog, 'u_size'), uColor = gl.getUniformLocation(prog, 'u_color');
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE); gl.clearColor(0, 0, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let aspect = 1, baseSize = 2;
    function resize() {
      cv.width = Math.floor(innerWidth * dpr); cv.height = Math.floor(innerHeight * dpr);
      cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
      gl.viewport(0, 0, cv.width, cv.height); aspect = cv.width / cv.height;
      baseSize = Math.max(1.5, Math.min(3.4, innerWidth / 480)) * dpr;
    }
    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    window.addEventListener('pointermove', e => { target.x = (e.clientX / innerWidth - 0.5) * 1.2; target.y = (e.clientY / innerHeight - 0.5) * 0.85; }, { passive: true });
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 160); }, { passive: true });
    function rotM(yaw, pitch) {
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
      return new Float32Array([cy, 0, -sy, 0, sy * sx, cx, cy * sx, 0, sy * cx, -sx, cy * cx, 0, 0, 0, 0, 1]);
    }
    let col = accentVec(), tick = 0, t = 0, rafId;
    function render(yaw, pitch) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix4fv(uRot, false, rotM(yaw, pitch));
      gl.uniform1f(uAspect, aspect); gl.uniform1f(uSize, baseSize);
      gl.uniform3f(uColor, col[0], col[1], col[2]);
      gl.drawArrays(gl.POINTS, 0, N);
    }
    function frame() {
      t += 0.0016;
      cur.x += (target.x - cur.x) * 0.045; cur.y += (target.y - cur.y) * 0.045;
      if (tick-- <= 0) { col = accentVec(); tick = 18; }
      render(t + cur.x, cur.y * 0.9);
      rafId = requestAnimationFrame(frame);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else if (!reduce) { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(frame); }
    });
    resize();
    if (reduce) { render(0.5, 0.2); }            // static single frame, no animation
    else rafId = requestAnimationFrame(frame);
    return true;
  }

  /* 2D constellation fallback for browsers without WebGL */
  function init2D(cv) {
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, pts;
    const mouse = { x: -9999, y: -9999 };
    const accent = () => (getComputedStyle(root).getPropertyValue('--accent-rgb').trim() || '110,231,255');
    function resize() {
      w = cv.width = Math.floor(innerWidth * dpr); h = cv.height = Math.floor(innerHeight * dpr);
      cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
      const n = Math.max(26, Math.min(64, Math.floor(innerWidth / 26)));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22 * dpr, vy: (Math.random() - .5) * .22 * dpr }));
    }
    window.addEventListener('pointermove', e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; }, { passive: true });
    window.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 180); }, { passive: true });
    let rafId;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const rgb = accent(), max = 150 * dpr;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 170 * dpr && d > 0.1) { p.x += dx / d * .5; p.y += dy / d * .5; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5 * dpr, 0, 6.283); ctx.fillStyle = 'rgba(' + rgb + ',.5)'; ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (dd < max) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = 'rgba(' + rgb + ',' + (.15 * (1 - dd / max)).toFixed(3) + ')'; ctx.lineWidth = dpr; ctx.stroke(); }
      }
      rafId = requestAnimationFrame(frame);
    }
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(rafId); else { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(frame); } });
    resize(); rafId = requestAnimationFrame(frame);
  }

  /* ---------- nav burger ---------- */
  $('#burger').addEventListener('click', () => { const open = $('#navLinks').classList.toggle('open'); $('#burger').setAttribute('aria-expanded', String(open)); });

  function toast(msg) { $('#toastMsg').textContent = msg; const t = $('#toast'); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); }

  // pagination / infinite scroll
  const projMoreBtn = $('#projMoreBtn'); if (projMoreBtn) projMoreBtn.addEventListener('click', loadMoreProjects);
  const blogMoreBtn = $('#blogMoreBtn'); if (blogMoreBtn) blogMoreBtn.addEventListener('click', loadMoreBlog);
  if ('IntersectionObserver' in window) {
    const moreObs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting || e.target.hidden) return;
      if (e.target.id === 'projMore') loadMoreProjects();
      else if (e.target.id === 'blogMore') loadMoreBlog();
    }), { rootMargin: '320px 0px' });
    ['#projMore', '#blogMore'].forEach(s => { const el = $(s); if (el) moreObs.observe(el); });
  }

  // project modal close handlers
  $$('#projModal [data-close]').forEach(el => el.addEventListener('click', closeProjectModal));

  /* ============================================================
     INIT
     ============================================================ */
  renderStatic();

  /* ---------- entry: immersive "choose your side" intro, with deep-link bypass ---------- */
  const params = new URLSearchParams(location.search);
  const qLens = params.get('lens');
  const qSide = params.get('side');
  let effLens = null;                                   // a lens forced by a shared link
  if (qSide && SIDES[qSide]) effLens = SIDES[qSide].lens;
  else if (qLens && (qLens === 'overview' || byId[qLens])) effLens = qLens;
  const hash = location.hash;
  const hasDeepView = /^#\/(about|work|security|experience|writing|contact)\/?$/.test(hash) || /^#\/blog\//.test(hash);

  setLens(effLens || 'overview', { silent: true });     // pre-theme/-trim the site behind the overlay

  const intro = $('#intro');
  let entered = false;
  function finishEnter() {
    if (entered) return; entered = true; handoffInFlight = false;
    if (intro) { intro.classList.add('is-gone'); intro.setAttribute('aria-hidden', 'true'); setTimeout(() => { intro.style.display = 'none'; }, 460); }
    document.body.classList.remove('intro-open');
    handleRoute();
  }
  // Commit a chosen side: theme + hard-focus, optionally fly the 3D intro in, then reveal.
  function enterSite(sideKey, opts) {
    opts = opts || {};
    const side = SIDES[sideKey] ? sideKey : 'everything';
    if (opts.go) location.hash = '#/' + opts.go;   // so handleRoute (in finishEnter) lands on this view
    handoffInFlight = true;
    setLens(SIDES[side].lens, { silent: true });
    const fly = !opts.instant && !reduce && window.RamisIntro && window.RamisIntro.active;
    if (fly) { try { window.RamisIntro.flyOut(side, () => { flashLens(); finishEnter(); }); } catch (e) { finishEnter(); } }
    else { if (!reduce && !opts.instant) flashLens(); finishEnter(); }
  }
  window.RamisEnter = enterSite;                         // bridge: the 3D intro module calls this on pick
  window.__ramis = { lenses: [DATA.overviewLens, ...DATA.lenses], reduce };

  if (intro) {
    $$('#intro [data-side]').forEach(btn => {
      const side = btn.getAttribute('data-side');
      const goTo = btn.getAttribute('data-go');
      btn.addEventListener('click', () => enterSite(side, goTo ? { instant: true, go: goTo } : {}));
      btn.addEventListener('pointerenter', () => { try { window.RamisIntro && window.RamisIntro.focus && window.RamisIntro.focus(side); } catch (e) {} });
    });
    const skip = $('#introSkip'); if (skip) skip.addEventListener('click', () => enterSite('everything', { instant: true }));
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !entered && document.body.classList.contains('intro-open')) enterSite('everything', { instant: true }); });

  if (effLens || hasDeepView) {                          // shared/deep link → bypass the intro entirely
    if (intro) { intro.style.display = 'none'; intro.setAttribute('aria-hidden', 'true'); }
    document.body.classList.remove('intro-open');
    entered = true;
    handleRoute();
  } else {                                               // cold visit to root → show the intro (intro.js self-mounts the 3D)
    document.body.classList.add('intro-open');
    if (intro) intro.setAttribute('aria-hidden', 'false');
  }

  // Safety net: never leave revealable content stuck hidden on an edge-case browser.
  setTimeout(() => $$('.view.is-active .rv:not(.in)').forEach(el => el.classList.add('in')), 1500);

})();
