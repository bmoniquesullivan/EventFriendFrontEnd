// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpuvGu9gmlfREn0fxBV-ZHdvp6qnpVH6M",
  authDomain: "eventfriendfirebase.firebaseapp.com",
  projectId: "eventfriendfirebase",
  storageBucket: "eventfriendfirebase.appspot.com",
  messagingSenderId: "670320576123",
  appId: "1:670320576123:web:6c3f0bc90ce2c879c104de",
  measurementId: "G-CSWH278XZS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };



