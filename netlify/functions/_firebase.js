const admin = require('firebase-admin');

function getDb() {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT environment variable');
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(raw);
    } catch (_) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT is not valid JSON');
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'mk-pedia-16dbd'
    });
  }
  return admin.firestore();
}

module.exports = { getDb };
