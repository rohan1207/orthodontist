import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

// Your web app's Firebase configuration, loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_FIREBASE_APP_ID

};

// Debug: Log the configuration values
console.log('Firebase Config Debug:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '***' + import.meta.env.VITE_FIREBASE_API_KEY.slice(-4) : 'MISSING',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? '***' + import.meta.env.VITE_FIREBASE_APP_ID.slice(-4) : 'MISSING'
});

// Dev-time sanity checks to catch the most common misconfigurations
if (import.meta.env.DEV) {
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.error('VITE_FIREBASE_API_KEY is missing. Use the Web API Key from Firebase Console > Project settings > General.');
  } else if (!String(import.meta.env.VITE_FIREBASE_API_KEY).startsWith('AIza')) {
    console.warn('VITE_FIREBASE_API_KEY does not look like a Firebase Web API Key. Make sure you used the key from Firebase Console > Project settings > General.');
  }

  if (firebaseConfig.storageBucket && !/\.appspot\.com$/i.test(firebaseConfig.storageBucket)) {
    console.warn(
      `Your storageBucket appears to be "${firebaseConfig.storageBucket}". In Firebase config, it should typically be <project-id>.appspot.com, not firebasestorage.app.`
    );
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Ensure auth state persists across reloads
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Auth persistence could not be set:', err);
});

// Request additional user information (email)
// This is often the default, but it's good to be explicit.
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { auth, googleProvider };
