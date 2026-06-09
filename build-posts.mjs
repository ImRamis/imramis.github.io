/* Compiles content/posts/*.md (authored via the CMS) into assets/js/posts.js
   (window.POSTS). Zero-dependency; runs locally and in CI before deploy.
   Usage: node build-posts.mjs */
import fs from 'fs';
import path from 'path';

const DIR = 'content/posts';

function unq(s) {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    try { return JSON.parse(s); } catch { return s.slice(1, -1); }
  }
  return s;
}
function parse(raw) {
  raw = raw.replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  const lines = m[1].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const km = lines[i].match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!km) continue;
    const key = km[1];
    let val = km[2];
    if (val === '') {
      const list = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) { list.push(unq(lines[j].replace(/^\s*-\s+/, ''))); j++; }
      if (list.length) { data[key] = list; i = j - 1; continue; }
      data[key] = '';
      continue;
    }
    if (val.startsWith('[')) {
      try { data[key] = JSON.parse(val); }
      catch { data[key] = val.replace(/^\[|\]$/g, '').split(',').map(s => unq(s)).filter(Boolean); }
      continue;
    }
    data[key] = unq(val);
  }
  return { data, body: m[2] };
}

function readingTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

if (!fs.existsSync(DIR)) { fs.writeFileSync('assets/js/posts.js', 'window.POSTS = [];\n'); console.log('no posts dir; wrote empty posts.js'); process.exit(0); }

const posts = fs.readdirSync(DIR).filter(f => f.endsWith('.md')).map(f => {
  const { data, body } = parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  return {
    slug: f.replace(/\.md$/, ''),
    title: data.title || f.replace(/\.md$/, ''),
    date: data.date || '1970-01-01',
    track: data.track || 'research',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
    readingTime: data.readingTime || readingTime(body),
    excerpt: data.excerpt || body.trim().split('\n').find(Boolean) || '',
    body: body.trim(),
  };
}).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

fs.writeFileSync('assets/js/posts.js', `/* Auto-generated from content/posts/*.md by build-posts.mjs. Do not edit by hand. */\nwindow.POSTS = ${JSON.stringify(posts, null, 2)};\n`, 'utf8');
console.log(`compiled ${posts.length} posts -> assets/js/posts.js (${fs.statSync('assets/js/posts.js').size} bytes)`);
console.log('tracks:', [...new Set(posts.map(p => p.track))].join(', '));
