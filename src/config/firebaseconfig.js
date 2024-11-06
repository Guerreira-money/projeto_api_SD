// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";


dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Eu sou Firebase e conectei!");

export default firebaseConfig;