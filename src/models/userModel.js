import validator from 'validator';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebaseconfig.js';

// Função para validar dados do usuário
const validateUserData = (email, password) => {
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

// Função para verificar se o email já existe no Firebase Auth
const emailExistsInAuth = async (email) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error('O email já está em uso no Firestore');
  }
};

// Função para verificar se o email já existe no Firestore
const emailExistsInFirestore = async (email) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error('O email já está em uso no Firebase');
  }
};

export { validateUserData, emailExistsInAuth, emailExistsInFirestore };

