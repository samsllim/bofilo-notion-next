import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bofilo-ai-48489.firebaseapp.com",
  projectId: "bofilo-ai-48489",
  storageBucket: "bofilo-ai-48489.firebasestorage.app",
  messagingSenderId: "925359401169",
  appId: "1:925359401169:web:0e9973bf51ba9dc1853df0",
  measurementId: "G-8YDL55HBPK"
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };