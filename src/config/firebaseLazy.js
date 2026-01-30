// Firebase 지연 로딩 래퍼
// 초기 번들 크기를 줄이기 위해 Firebase를 동적으로 로드

let firebasePromise = null;
let cachedDb = null;
let cachedAuth = null;

// Firebase 초기화를 지연시키고 캐싱
const initFirebase = async () => {
  if (firebasePromise) return firebasePromise;

  firebasePromise = (async () => {
    const { initializeApp } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    const { getAuth } = await import('firebase/auth');

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    cachedDb = getFirestore(app);
    cachedAuth = getAuth(app);

    return { db: cachedDb, auth: cachedAuth };
  })();

  return firebasePromise;
};

// Firestore 인스턴스 가져오기 (지연 로딩)
export const getDb = async () => {
  if (cachedDb) return cachedDb;
  const { db } = await initFirebase();
  return db;
};

// Auth 인스턴스 가져오기 (지연 로딩)
export const getAuthInstance = async () => {
  if (cachedAuth) return cachedAuth;
  const { auth } = await initFirebase();
  return auth;
};

// 미리 Firebase 초기화 시작 (idle 시간에)
export const preloadFirebase = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => initFirebase());
  } else {
    setTimeout(() => initFirebase(), 100);
  }
};
