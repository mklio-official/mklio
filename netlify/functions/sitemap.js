const { getDb } = require('./_firebase');
const SITE = 'https://mk-pedia.netlify.app';

exports.handler = async () => {
  try {
    const db = getDb();
    const urls = [`<url><loc>${SITE}/</loc></url>`];
    const maxUrls = 45000;
    // Query only approved records. The status field has a normal single-field index.
    // Admin SDK runs server-side and does not expose pending records in the response.
    const snap = await db.collection('resources')
      .where('status', '==', 'approved')
      .limit(maxUrls)
      .get();

    for (const doc of snap.docs) {
      const data = doc.data();
      const loc = `${SITE}/paper/${encodeURIComponent(doc.id)}`;
      let lastmod = '';
      try {
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          lastmod = `<lastmod>${data.createdAt.toDate().toISOString().slice(0,10)}</lastmod>`;
        }
      } catch (_) {}
      urls.push(`<url><loc>${loc}</loc>${lastmod}</url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=300',
        'X-Content-Type-Options': 'nosniff'
      },
      body: xml
    };
  } catch (error) {
    console.error('Sitemap function error:', error);
    return { statusCode: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }, body: 'Sitemap temporarily unavailable.' };
  }
};
