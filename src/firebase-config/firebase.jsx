import { initializeApp } from "firebase/app";

// Importamos getFirestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw_RcINIzNDntAgbpv8h46eA8-ZF6Nf_o",
  authDomain: "crud-firebase-fsj24.firebaseapp.com",
  projectId: "crud-firebase-fsj24",
  storageBucket: "crud-firebase-fsj24.appspot.com",
  messagingSenderId: "709073239485",
  appId: "1:709073239485:web:567e0c71f5fdd77faa66d4"
};

const app = initializeApp(firebaseConfig);

// Que me exporte db que creamos en Firebase
export const db = getFirestore(app);