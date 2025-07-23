// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth(app);
export default app;

