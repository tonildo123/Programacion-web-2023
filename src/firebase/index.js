import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

/**
 * Function to upolad file to fierbase
 * @param {File} file the file to uplad
 * @returns  {Promise<string>} url of the upladed file
 */

export async function uploadFile(file, nameFile, folderName){

  const storageRef = ref(storage, `${folderName}/${nameFile}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url;
  
}

export {app, db, auth, firebaseConfig}