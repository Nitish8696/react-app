import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDPH3y5OxIu2CpFmO-sKpJ9iElaj97HX14",
  authDomain: "ecommerce-cf8a9-2e120.firebaseapp.com",
  projectId: "ecommerce-cf8a9",
  storageBucket: "ecommerce-cf8a9.appspot.com",
  messagingSenderId: "462528631287",
  appId: "1:462528631287:web:754679b083c0c10bf39ef2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)