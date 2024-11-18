import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fileURLToPath } from "url"; // Importação do 'url' para obter o caminho do arquivo no ESM
import { dirname } from "path"; // Importação do 'path' para obter o diretório do arquivo
import dotenv from "dotenv";

dotenv.config();

// Configurações do Firebase
export const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
console.log("Eu sou Firebase e conectei!");

// Inicializar Cloud Firestore e autenticação
export const db = getFirestore(app);
export const auth = getAuth(app);
