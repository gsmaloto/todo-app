import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyANg6LJj-t7iZnxs5VwwQnFW0vcy-E0A",
  authDomain: "todo-app-68d01.firebaseapp.com",
  projectId: "todo-app-68d01",
  storageBucket: "todo-app-68d01.appspot.com",
  messagingSenderId: "154535374644",
  appId: "1:154535374644:web:7cb3349886b3609552bf61",
  measurementId: "G-T2HB7GY21E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
