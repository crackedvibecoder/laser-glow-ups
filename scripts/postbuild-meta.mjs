import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = 'dist';
const baseHtmlPath = join(dist, 'index.html');
console.error('DEBUG: reading from', baseHtmlPath, 'size?', (() => { try { return statSync(baseHtmlPath).size; } catch { return 'no'; } })());
const baseHtml = readFileSync(baseHtmlPath, 'utf8');

const routes = [
  {
    path: 'why-laser/index.html',
    title: 'Still Thinking About Laser? | Laser Location Manchester',
    description:
      'Not sure if laser is worth it? See the real reasons people choose laser hair removal - shaving frustration, ingrowns, face hair, waxing costs and long-term smoothness.',
    url: 'https://offer.laserlocation.co.uk/why-laser',
  },
];

const escapeAttr = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function setTag(html, matcher, replacement) {
  if (!matcher.test(html)) {
    console.error('DEBUG: matcher failed for', replacement);
    console.error('DEBUG: html length:', html.length);
    console.error('DEBUG: html head:', html.slice(0, 1500));
    throw new Error(`Missing metadata tag for ${replacement}`);
  }
  return html.replace(matcher, replacement);
}

for (const route of routes) {
  let html = baseHtml;
  const title = escapeAttr(route.title);
  const desc = escapeAttr(route.description);
  const url = escapeAttr(route.url);

  html = setTag(html, /<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = setTag(html, /<meta name="description" content=".*?">/s, `<meta name="description" content="${desc}">`);
  html = setTag(html, /<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${title}">`);
  html = setTag(html, /<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${title}">`);
  html = setTag(html, /<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${desc}">`);
  html = setTag(html, /<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${desc}">`);
  html = setTag(html, /<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${url}">`);
  html = setTag(html, /<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${url}" />`);
  // Preserve the base og:image and twitter:image tags for route pages so the
  // branded social preview is served on every route instead of a host default.
  html = setTag(html, /<meta property="og:image" content=".*?">/s, `<meta property="og:image" content="https://offer.laserlocation.co.uk/og-image.jpg">`);
  html = setTag(html, /<meta name="twitter:image" content=".*?">/s, `<meta name="twitter:image" content="https://offer.laserlocation.co.uk/og-image.jpg">`);

  const out = join(dist, route.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`wrote route metadata: ${out}`);
}
