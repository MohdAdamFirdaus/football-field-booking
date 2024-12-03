import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAr3A72Ywq1J23d39Eg03YZhl6qKatePHI",
    authDomain: "field-booking-39b94.firebaseapp.com",
    projectId: "field-booking-39b94",
    storageBucket: "field-booking-39b94.appspot.com",
    messagingSenderId: "63826934265",
    appId: "1:63826934265:web:0c0d1e1c0dea98ccbf6528"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };