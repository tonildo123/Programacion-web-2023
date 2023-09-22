import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

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

export async function uploadFile(file, nameFile, folderName) {
  console.log('llega')
  console.log('archivo', file)
  console.log('nombre', nameFile)
  console.log('carpeta', folderName)

  try {

    
    const storageRef = ref(storage, `${folderName}/${v4()}${nameFile}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    console.log('aqui deberia estar la url', url)
    return url;
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
    throw error;
  }

}



export { app, db, auth, firebaseConfig }