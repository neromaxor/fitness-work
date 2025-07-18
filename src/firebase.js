// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Конфігурація з Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBDJbuh2EgvSDo5J85hu54KkGerB3Uc6Ps",
  authDomain: "fitnes-projekt.firebaseapp.com",
  projectId: "fitnes-projekt",
  storageBucket: "fitnes-projekt.appspot.com", // виправлено `.app` на `.appspot.com`
  messagingSenderId: "974974473410",
  appId: "1:974974473410:web:85a98262222141de57575b"
};

// Ініціалізація
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Підключаємо Firestore (база даних)

export { db };
