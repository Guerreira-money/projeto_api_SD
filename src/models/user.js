import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig.js';

// Função para obter um usuário pelo ID (como um substituto para um modelo de banco de dados)
const getUserById = async (userId) => {
  const userDoc = await getDoc(doc(collection(db, 'users'), userId));
  if (!userDoc.exists()) {
    throw new Error('Usuário não encontrado');
  }
  return userDoc.data();
};

export { getUserById };
