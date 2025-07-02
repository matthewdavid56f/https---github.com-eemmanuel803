import { initializeApp, getApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnJo7RLOf_Ctl05Yaxy4hAOhaabzKcy54",
  authDomain: "guad-eyes.firebaseapp.com",
  projectId: "guad-eyes",
  storageBucket: "guad-eyes.firebasestorage.app",
  messagingSenderId: "402502331730",
  appId: "1:402502331730:web:8f08df58cd9e01a0e69e8b"
};

// Initialize Firebase, preventing re-initialization in a Next.js dev environment
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
