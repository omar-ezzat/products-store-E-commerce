import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcRqFlr5mVf3LcRuVu4aaDDnFMldGsEA0",
  authDomain: "online-store-ec365.firebaseapp.com",
  projectId: "online-store-ec365",
  storageBucket: "online-store-ec365.firebasestorage.app",
  messagingSenderId: "1035786961250",
  appId: "1:1035786961250:web:a177cd992704b1dac8ac3b",
  measurementId: "G-72ZMWVYNY3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
