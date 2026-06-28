/* ============================================================
   VIEW FX - a per-view 3D centrepiece (Three.js, ES module).
   One morphing point-cloud that reshapes into a distinct motif for each
   view (home→orb, about→double-helix, work→cube-grid, security→shield-dome,
   experience→ascending-spiral, writing→stacked-planes, contact→radiating-rings)
   and recolours to the active lens. Lives in the background layer so it reads
   as immersive depth without hurting text legibility. Reacts to the
   data-route / data-lens / data-motion attributes app.js sets on <html>.
   No-op when motion is off or WebGL is unavailable.
   ============================================================ */
import * as THREE from 'three';

(function () {
  'use strict';
  const root = document.documentElement;
  if (root.getAttribute('data-motion') === 'off') return;            // honor the motion toggle
  const host = document.querySelector('.bg-layer'); if (!host) return;

  const cv = document.createElement('canvas'); cv.className = 'view-fx'; cv.setAttribute('aria-hidden', 'true');
  host.appendChild(cv);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'low-power' }); if (!renderer || !renderer.getContext()) { cv.remove(); return; } }
  catch (e) { cv.remove(); return; }

  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);

  // soft round sprite for points
  function radial() { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, '#fff'); gr.addColorStop(.3, 'rgba(255,255,255,.75)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); }

  const N = 1000;
  const cur = new Float32Array(N * 3), tgt = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) cur[i] = (Math.random() - .5) * 9;
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(cur.slice(), 3));
  const mat = new THREE.PointsMaterial({ size: .05, map: radial(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: new THREE.Color('rgb(92,198,221)'), opacity: .9 });
  const points = new THREE.Points(geo, mat); scene.add(points);
  // a few "constellation" lines that ride the first points, for structure
  const LN = 90; const lpos = new Float32Array(LN * 2 * 3);
  const lgeo = new THREE.BufferGeometry(); lgeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
  const lines = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: new THREE.Color('rgb(92,198,221)'), transparent: true, opacity: .12, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(lines);

  const GA = Math.PI * (3 - Math.sqrt(5));
  function shapeFor(view) {
    for (let i = 0; i < N; i++) {
      const t = (i + .5) / N, a = i * GA; let x, y, z;
      switch (view) {
        case 'about': { const u = t * Math.PI * 9, rr = 1.5, s = i % 2 ? 1 : -1; x = Math.cos(u) * rr * s; y = (t - .5) * 6; z = Math.sin(u) * rr * s; break; }                 // double helix
        case 'work': { const g = 8, gx = i % g, gy = Math.floor(i / g) % g, gz = Math.floor(i / (g * g)) % g; x = (gx - 3.5) * .62; y = (gy - 3.5) * .62; z = (gz - 3.5) * .62; break; } // cube lattice
        case 'security': { const ph = Math.acos(1 - t), th = a, r = 2.6; x = Math.sin(ph) * Math.cos(th) * r; y = Math.cos(ph) * r * 1.05 - .6; z = Math.sin(ph) * Math.sin(th) * r; break; } // shield dome
        case 'experience': { const u = t * Math.PI * 7, r = .4 + t * 2.2; x = Math.cos(u) * r; y = (t - .5) * 5.4; z = Math.sin(u) * r; break; }                                    // ascending spiral
        case 'writing': { const layer = Math.floor(t * 7); x = ((i * 0.37) % 1 - .5) * 4; y = (layer - 3) * .62; z = ((i * 0.61) % 1 - .5) * 2.6; break; }                            // stacked planes
        case 'contact': { const ring = Math.floor(t * 6), u = a, r = .5 + ring * .42; x = Math.cos(u) * r; y = Math.sin(u) * r; z = (ring - 2.5) * .35; break; }                       // radiating rings
        default: { const ph = Math.acos(1 - 2 * t), th = a, r = 2.2 + (i % 7 === 0 ? .5 : 0); x = Math.sin(ph) * Math.cos(th) * r; y = Math.sin(ph) * Math.sin(th) * r; z = Math.cos(ph) * r; } // orb
      }
      tgt[i * 3] = x; tgt[i * 3 + 1] = y; tgt[i * 3 + 2] = z;
    }
  }
  shapeFor(root.getAttribute('data-route') || 'home');

  const accentRGB = () => (getComputedStyle(root).getPropertyValue('--accent-rgb').trim() || '92,198,221');
  let targetColor = new THREE.Color(`rgb(${accentRGB()})`);
  const obs = new MutationObserver(ms => ms.forEach(m => {
    if (m.attributeName === 'data-route') { shapeFor(root.getAttribute('data-route') || 'home'); wake(); }
    else if (m.attributeName === 'data-lens') { targetColor = new THREE.Color(`rgb(${accentRGB()})`); wake(); }
    else if (m.attributeName === 'data-motion' && root.getAttribute('data-motion') === 'off') { stop(); cv.style.display = 'none'; }
  }));
  obs.observe(root, { attributes: true });

  const mouse = { x: 0, y: 0 };
  addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth - .5; mouse.y = e.clientY / innerHeight - .5; wake(); }, { passive: true });

  // Animate on demand: run while morphing / reacting, then idle (stop the rAF) once settled.
  // This frees the main thread when nothing is changing, which keeps TBT/TTI healthy.
  let raf = 0, running = false, lastDraw = 0, activeUntil = 0;
  const FRAME_MS = 1000 / 30;            // cap at ~30fps
  const GRACE = 1400;                    // keep animating this long after any change, then settle
  function wake() { activeUntil = performance.now() + GRACE; if (running) return; running = true; lastDraw = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  function frame(now) {
    if (now - lastDraw < FRAME_MS) { raf = requestAnimationFrame(frame); return; }
    const dt = Math.min((now - lastDraw) / 1000, .05); lastDraw = now;
    const p = geo.attributes.position.array;
    let maxd = 0;
    for (let i = 0; i < N * 3; i++) { const d = tgt[i] - cur[i]; cur[i] += d * Math.min(1, dt * 2.4); p[i] = cur[i]; const a = d < 0 ? -d : d; if (a > maxd) maxd = a; }
    geo.attributes.position.needsUpdate = true;
    const lp = lgeo.attributes.position.array;
    for (let k = 0; k < LN; k++) { const i = (k * 17) % N, j = (i + 1) % N; for (let c = 0; c < 3; c++) { lp[k * 6 + c] = cur[i * 3 + c]; lp[k * 6 + 3 + c] = cur[j * 3 + c]; } }
    lgeo.attributes.position.needsUpdate = true;
    points.rotation.y += dt * 0.07; lines.rotation.y = points.rotation.y;
    const tx = mouse.x * 1.1, ty = -mouse.y * 0.5;
    points.position.x += (tx - points.position.x) * Math.min(1, dt * 2); points.position.y += (ty - points.position.y) * Math.min(1, dt * 2);
    lines.position.copy(points.position);
    points.rotation.x = mouse.y * 0.25; lines.rotation.x = points.rotation.x;
    mat.color.lerp(targetColor, Math.min(1, dt * 3)); lines.material.color.copy(mat.color);
    renderer.render(scene, camera);
    const settled = Math.abs(tx - points.position.x) < 0.002 && Math.abs(ty - points.position.y) < 0.002;
    if (now > activeUntil && maxd < 0.01 && settled) { stop(); return; }   // nothing changing -> idle
    raf = requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else wake(); });
  wake();
})();
