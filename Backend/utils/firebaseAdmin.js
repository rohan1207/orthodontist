import admin from 'firebase-admin';

// Initialize Firebase Admin SDK using environment variables
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

if (!admin.apps.length) {
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('[FIREBASE_ADMIN] Missing admin credentials in environment. Firebase token verification will fail.');
  } else {
    // Replace escaped newlines in private key
    if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
}

export default admin;
