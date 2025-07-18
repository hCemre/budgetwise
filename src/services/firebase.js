import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNT_dDcE4Tb_CoPoim3qJcBRySVHskoWU",
  authDomain: "budgetwise-68666.firebaseapp.com",
  projectId: "budgetwise-68666",
  storageBucket: "budgetwise-68666.appspot.com",
  messagingSenderId: "565138159208",
  appId: "1:565138159208:web:376c34557c3c87f5742ddd",
  measurementId: "G-4TM2CV9YC0",
};

// Uygulamayı başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
