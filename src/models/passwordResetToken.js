import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig.js';

// Função para criar um token de redefinição de senha
export const createPasswordResetToken = async (userId, token) => {
  const resetTokensRef = collection(db, 'passwordResetTokens');
  await addDoc(resetTokensRef, {
    userId,
    token,
    createdAt: new Date().toISOString()
  });
};

// Função para buscar um token válido para redefinição de senha
export const findPasswordResetToken = async (token) => {
  const resetTokensRef = collection(db, 'passwordResetTokens');
  const q = query(resetTokensRef, where('token', '==', token));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error('Token de redefinição inválido ou expirado');
  }
  return querySnapshot.docs[0];
};

// Função para remover o token de redefinição após uso
export const deletePasswordResetToken = async (tokenDocId) => {
  await deleteDoc(doc(db, 'passwordResetTokens', tokenDocId));
};

