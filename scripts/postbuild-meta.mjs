import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = 'dist';
const baseHtmlPath = join(dist, 'index.html');
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
  if (!matcher.test(html)) throw new Error(`Missing metadata tag for ${replacement}`);
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

  const out = join(dist, route.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`wrote route metadata: ${out}`);
}
