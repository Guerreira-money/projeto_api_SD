// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fileURLToPath } from 'url'; // Adicionando a importação do 'url'
import { dirname } from 'path'; // Mantenha a importação de 'path'
import dotenv from "dotenv";


dotenv.config();

// Obter o diretório atual no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Verificar se as variáveis de ambiente estão sendo carregadas corretamente
console.log("Diretório atual:", __dirname);
console.log("API Key do Firebase:", process.env.API_KEY_FIREBASE); // Exemplo de verificar uma variável


export const firebaseConfig = {
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

// Initialize Cloud Firestore and authentication
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };

