import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getAuth } from "firebase/auth";
// import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyABDggLbGI1cpYJruXzDPLDDZuLLQWgjVw",
  authDomain: "mi-mascota-a3b05.firebaseapp.com",
  projectId: "mi-mascota-a3b05",
  storageBucket: "mi-mascota-a3b05.appspot.com",
  messagingSenderId: "256392957605",
  appId: "1:256392957605:web:5cfa4166f3fb8e4830874c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {app, db, auth, firebaseConfig}