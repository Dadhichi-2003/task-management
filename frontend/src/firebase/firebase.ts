// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANrrZ8a4eoblbbv9aNt-h9eiCd12phsu0",
  authDomain: "taskapp-bc7b4.firebaseapp.com",
  databaseURL: "https://taskapp-bc7b4-default-rtdb.firebaseio.com",
  projectId: "taskapp-bc7b4",
  storageBucket: "taskapp-bc7b4.firebasestorage.app",
  messagingSenderId: "737918565711",
  appId: "1:737918565711:web:d861ca1f7c9534689ed93a",
  measurementId: "G-PRE98L2S54"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);