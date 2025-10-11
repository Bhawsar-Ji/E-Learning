import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "logincoursecrush.firebaseapp.com",
  projectId: "logincoursecrush",
  storageBucket: "logincoursecrush.firebasestorage.app",
  messagingSenderId: "157211304749",
  appId: "1:157211304749:web:6afa7780d6ed733d6769a4",
  measurementId: "G-5GHVBVDPRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}