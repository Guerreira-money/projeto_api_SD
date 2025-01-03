import validator from 'validator';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebaseconfig.js';



// Função para validar dados do usuário
export const validateUserData = (email, password) => {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email inválido');
  }
  if (password.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres');
  }
};

