/* ============================================================
   PRISM SELECT — immersive "choose your side" intro (Three.js, ES module)
   A central refracting prism + four field orbs, each showing its real
   discipline EMBLEM (the SVG assets) as a textured billboard so it's
   instantly recognisable in 3D — engineering / ai-ml / cybersecurity /
   ui-ux — plus "everything" at the centre. Hover/keys focus a side
   (swell + recolour the scene); pick → fly into the site.
   Self-mounts only when #intro is open, motion is allowed and WebGL works;
   otherwise the static HTML card picker (already in the DOM) takes over.
   ============================================================ */
import * as THREE from 'three';

(function () {
  'use strict';
  window.RamisIntro = { active: false };

  const intro = document.getElementById('intro');
  const canvas = document.getElementById('introCanvas');
  const bridge = window.__ramis || { lenses: [], reduce: false };
  if (!intro || !canvas) return;
  if (!document.body.classList.contains('intro-open')) return;     // deep link bypassed the intro
  if (bridge.reduce) return;                                       // motion off → flat HTML cards

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); if (!renderer || !renderer.getContext()) return; }
  catch (e) { return; }

  const lensById = {}; (bridge.lenses || []).forEach(l => (lensById[l.id] = l));
  const OVER = lensById.overview || { rgb: '92,198,221', rgb2: '130,120,217' };
  const FIELDS = [
    { side: 'engineering',   pos: [-3.0, 1.5, 0] },
    { side: 'aiml',          pos: [3.0, 1.5, 0] },
    { side: 'cybersecurity', pos: [-3.0, -1.5, 0] },
    { side: 'uiux',          pos: [3.0, -1.5, 0] }
  ];
  const col = rgb => new THREE.Color(`rgb(${rgb})`);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x07080d, 11, 30);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 200);
  camera.position.set(0, 0, 7.2);
  function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
  resize();

  // ---- glow sprite + emblem textures ----
  function radial() { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, '#fff'); gr.addColorStop(.28, 'rgba(255,255,255,.8)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); }
  const GLOW = radial();
  function glow(color, size) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .9 })); s.scale.set(size, size, 1); return s; }
  // render an emblem SVG into a crisp CanvasTexture
  function emblemTexture(side) {
    const c = document.createElement('canvas'); c.width = c.height = 320; const ctx = c.getContext('2d');
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const img = new Image();
    img.onload = () => { ctx.clearRect(0, 0, 320, 320); ctx.drawImage(img, 16, 16, 288, 288); tex.needsUpdate = true; };
    img.src = 'assets/img/emblems/' + side + '.svg';
    return tex;
  }

  // ---- centre: the prism (everything) ----
  const center = new THREE.Group(); scene.add(center);
  center.add(glow(col(OVER.rgb), 5.2));
  // faint faceted halo for 3D depth behind the emblem
  const halo = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.7, 0)), new THREE.LineBasicMaterial({ color: col(OVER.rgb2), transparent: true, opacity: .18 }));
  center.add(halo);
  const coreCloud = (function () { const n = 90, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const r = Math.random() * 1.2, t = Math.random() * 6.28, p = Math.acos(2 * Math.random() - 1); a[i * 3] = r * Math.sin(p) * Math.cos(t); a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); a[i * 3 + 2] = r * Math.cos(p); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); return new THREE.Points(g, new THREE.PointsMaterial({ size: .045, map: GLOW, color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .8 })); })();
  center.add(coreCloud);
  const centerEmblem = new THREE.Sprite(new THREE.SpriteMaterial({ map: emblemTexture('everything'), transparent: true, depthWrite: false })); centerEmblem.scale.set(3.4, 3.4, 1); center.add(centerEmblem);

  // ---- four field orbs (emblem billboards) ----
  const emblems = [];
  FIELDS.forEach(f => {
    const lens = lensById[f.side] || { rgb: '255,255,255', rgb2: '255,255,255' };
    const g = new THREE.Group(); g.position.set(f.pos[0], f.pos[1], f.pos[2]); scene.add(g);
    const halo2 = glow(col(lens.rgb2), 3.6); g.add(halo2);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.1, 48), new THREE.MeshBasicMaterial({ color: col(lens.rgb), transparent: true, opacity: .35, side: THREE.DoubleSide })); g.add(ring);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: emblemTexture(f.side), transparent: true, depthWrite: false })); spr.scale.set(2.0, 2.0, 1); g.add(spr);
    const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(f.pos[0], f.pos[1], f.pos[2])]), new THREE.LineBasicMaterial({ color: col(lens.rgb), transparent: true, opacity: .26 })); scene.add(beam);
    const hit = new THREE.Mesh(new THREE.SphereGeometry(1.25, 8, 8), new THREE.MeshBasicMaterial({ visible: false })); hit.position.copy(g.position); hit.userData.side = f.side; scene.add(hit);
    emblems.push({ side: f.side, group: g, spr, glow: halo2, ring, beam, hit, base: 1, target: 1 });
  });
  const centerHit = new THREE.Mesh(new THREE.SphereGeometry(1.9, 10, 10), new THREE.MeshBasicMaterial({ visible: false })); centerHit.userData.side = 'everything'; scene.add(centerHit);

  // ---- starfield depth ----
  const stars = (function () { const n = 260, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = (Math.random() - .5) * 30; a[i * 3 + 1] = (Math.random() - .5) * 18; a[i * 3 + 2] = -Math.random() * 34 - 2; } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: .05, map: GLOW, color: col(OVER.rgb2), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .6 })); scene.add(pts); return { pts, a }; })();

  // ---- interaction ----
  const ray = new THREE.Raycaster(); const ptr = new THREE.Vector2(-2, -2); let focused = 'engineering';
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  const fogTarget = col(OVER.rgb).multiplyScalar(0.16);
  function setFocus(side) {
    focused = side;
    emblems.forEach(e => (e.target = e.side === side ? 1.28 : (side && side !== 'everything' ? 0.82 : 1)));
    const fld = (side && side !== 'everything') ? lensById[side] : OVER;
    if (fld) fogTarget.copy(col(fld.rgb)).multiplyScalar(0.16);
    document.querySelectorAll('#intro [data-side]').forEach(b => b.classList.toggle('is-focus', b.getAttribute('data-side') === side));
    const lab = document.getElementById('introFocusLabel'); if (lab) lab.textContent = (lensById[side] && lensById[side].label) || 'Explore everything';
  }
  function onMove(e) {
    ptr.x = (e.clientX / innerWidth) * 2 - 1; ptr.y = -(e.clientY / innerHeight) * 2 + 1;
    target.x = (e.clientX / innerWidth - .5) * .7; target.y = -(e.clientY / innerHeight - .5) * .45;
    ray.setFromCamera(ptr, camera);
    const hits = ray.intersectObjects(emblems.map(x => x.hit).concat(centerHit));
    if (hits.length) { const s = hits[0].object.userData.side; if (s !== focused) setFocus(s); canvas.style.cursor = 'pointer'; } else canvas.style.cursor = '';
  }
  function onClick() { ray.setFromCamera(ptr, camera); const hits = ray.intersectObjects(emblems.map(x => x.hit).concat(centerHit)); if (hits.length && window.RamisEnter) window.RamisEnter(hits[0].object.userData.side); }
  window.addEventListener('pointermove', onMove, { passive: true });
  canvas.addEventListener('click', onClick);
  window.addEventListener('resize', resize);

  // ---- fly-out commit ----
  let flying = null;
  function flyOut(side, done) {
    const e = emblems.find(x => x.side === side);
    const to = e ? e.group.position.clone() : new THREE.Vector3(0, 0, 0);
    flying = { from: camera.position.clone(), to: to.setZ(to.z + 1.4), t0: performance.now(), dur: 640, done: done || (() => {}), called: false };
  }

  let raf, last = performance.now(), t = 0;
  function frame(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now; t += dt;
    cur.x += (target.x - cur.x) * .05; cur.y += (target.y - cur.y) * .05;
    // centre prism: gentle spin of the emblem + halo + bob
    centerEmblem.material.rotation += dt * .12; halo.rotation.y += dt * .25; halo.rotation.x += dt * .1;
    coreCloud.rotation.y -= dt * .2;
    center.position.y = Math.sin(t * .8) * .08;
    center.scale.setScalar(1 + Math.sin(t * 1.1) * .015);
    // field emblems: focus swell + gentle bob, engineering emblem slowly rotates
    emblems.forEach((e, i) => {
      e.base += (e.target - e.base) * Math.min(1, dt * 7);
      const bob = Math.sin(t * .9 + i) * .06;
      e.spr.scale.setScalar(2.0 * e.base);
      e.group.position.y = FIELDS[i].pos[1] + bob;
      e.ring.rotation.z += dt * (e.side === focused ? .8 : .25);
      if (e.side === 'engineering') e.spr.material.rotation += dt * .25;
      const lit = e.side === focused ? 1 : (focused && focused !== 'everything' ? .55 : .9);
      e.spr.material.opacity += (lit - e.spr.material.opacity) * Math.min(1, dt * 6);
      e.glow.material.opacity += (((e.side === focused ? 1 : .5)) - e.glow.material.opacity) * Math.min(1, dt * 6);
      e.beam.material.opacity += (((e.side === focused ? .55 : .18)) - e.beam.material.opacity) * Math.min(1, dt * 6);
    });
    scene.fog.color.lerp(fogTarget.clone().addScalar(.02), Math.min(1, dt * 4));
    const warp = flying ? 7 : 1;
    for (let i = 0; i < stars.a.length; i += 3) { stars.a[i + 2] += dt * 2.1 * warp; if (stars.a[i + 2] > 4) stars.a[i + 2] = -32; }
    stars.pts.geometry.attributes.position.needsUpdate = true;
    if (flying) {
      const p = Math.min((now - flying.t0) / flying.dur, 1), e = 1 - Math.pow(1 - p, 3);
      camera.position.lerpVectors(flying.from, flying.to, e);
      if (p >= 1 && !flying.called) { flying.called = true; const d = flying.done; flying = null; try { d(); } catch (er) {} }
    } else {
      camera.position.x += (cur.x - camera.position.x) * Math.min(1, dt * 3);
      camera.position.y += (cur.y - camera.position.y) * Math.min(1, dt * 3);
      camera.lookAt(0, 0, 0);
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function destroy() { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', resize); canvas.removeEventListener('click', onClick); try { renderer.dispose(); } catch (e) {} window.RamisIntro.active = false; }
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else { last = performance.now(); raf = requestAnimationFrame(frame); } });

  intro.classList.add('intro--3d');
  setFocus('engineering');
  window.RamisIntro = { active: true, focus: setFocus, flyOut: flyOut, destroy: destroy };
  raf = requestAnimationFrame(frame);
})();
