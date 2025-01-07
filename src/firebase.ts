// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0k0VynspMstndlSGHMGXLjQ2DU7-Ml8Q",
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