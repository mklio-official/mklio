const { getDb } = require('./_firebase');

const SITE = 'https://mk-pedia.netlify.app';
const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
const plain = (v, max = 300) => String(v == null ? '' : v).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const dateISO = (v) => {
  try {
    if (v && typeof v.toDate === 'function') return v.toDate().toISOString();
    if (v instanceof Date) return v.toISOString();
  } catch (_) {}
  return new Date().toISOString();
};

exports.handler = async (event) => {
  try {
    const id = String((event.queryStringParameters || {}).id || '').trim();
    if (!/^[A-Za-z0-9_-]{1,150}$/.test(id)) {
      return { statusCode: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' }, body: '<h1>Paper not found</h1>' };
    }

    const db = getDb();
    const snap = await db.collection('resources').doc(id).get();
    if (!snap.exists || snap.data().status !== 'approved') {
      return { statusCode: 404, headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' }, body: '<!doctype html><html lang="en"><meta charset="utf-8"><title>Paper not found | MK PEDIA</title><h1>Paper not found</h1><p>This resource may be unavailable or awaiting approval.</p><a href="/">Return to MK PEDIA</a></html>' };
    }

    const r = snap.data();
    const title = plain(r.title, 180) || 'Learning Resource';
    const subject = plain(r.subject, 100);
    const level = plain(r.level, 100);
    const category = plain(r.category, 100);
    const medium = plain(r.medium, 80);
    const description = plain(r.description, 500) || `${title} ${subject} ${level} ${medium} learning resource from MK PEDIA.`;
    const url = `${SITE}/paper/${encodeURIComponent(id)}`;
    const published = dateISO(r.createdAt);
    const drive = String(r.fileURL || '');
    if (!/^https:\/\/(drive\.google\.com|docs\.google\.com)\//i.test(drive)) {
      return { statusCode: 404, headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' }, body: '<h1>Resource link unavailable</h1>' };
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: title,
      description,
      url,
      learningResourceType: category || 'Educational material',
      educationalLevel: level || undefined,
      inLanguage: medium || undefined,
      about: subject || undefined,
      datePublished: published,
      publisher: { '@type': 'Organization', name: 'MK PEDIA', url: SITE }
    };
    Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k]);

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | MK PEDIA</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="MK PEDIA">
<meta property="og:title" content="${esc(title)} | MK PEDIA"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}"><meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
<style>
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f2f8fc;color:#18384d;font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.wrap{max-width:820px;margin:40px auto;padding:0 18px}.card{background:#fff;border:1px solid #d7e7ef;border-radius:22px;padding:clamp(22px,5vw,42px);box-shadow:0 12px 40px #173b5010}.brand{font-weight:900;letter-spacing:.04em;color:#1685b7;font-size:1.15rem}h1{line-height:1.2;font-size:clamp(1.8rem,5vw,2.6rem);margin:22px 0 12px}.meta{color:#587386;display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.tag{background:#e8f5fb;border-radius:999px;padding:5px 12px;font-size:.9rem}.desc{white-space:pre-wrap}.btn{display:inline-block;background:#159bd0;color:white;text-decoration:none;font-weight:800;padding:13px 22px;border-radius:13px;margin:14px 0}.back{color:#167ba8;text-decoration:none;font-weight:700}footer{color:#668092;font-size:.9rem;margin:22px 4px}
</style>
</head>
<body><main class="wrap"><article class="card">
<a class="back" href="/">← MK PEDIA Home</a><div class="brand">📚 MK PEDIA</div>
<h1>${esc(title)}</h1>
<div class="meta">${[category, level, subject, medium].filter(Boolean).map(x => `<span class="tag">${esc(x)}</span>`).join('')}</div>
<p class="desc">${esc(description)}</p>
<p><a class="btn" href="${esc(drive)}" target="_blank" rel="noopener noreferrer">Open / Download Paper ↗</a></p>
<p>Educational resources in Tamil, Sinhala and English.</p>
</article><footer>MK PEDIA · Designed by Khalid Fairooz · <a class="back" href="/">Visit the library</a></footer></main></body></html>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=300',
        'X-Content-Type-Options': 'nosniff'
      },
      body: html
    };
  } catch (error) {
    console.error('Paper SEO function error:', error);
    return { statusCode: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }, body: 'MK PEDIA page is temporarily unavailable.' };
  }
};
              
