import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  deleteUser, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '../config/firebaseconfig.js';
import { db } from '../config/firebaseconfig.js';
import { addDoc, collection } from 'firebase/firestore';
import { emailExistsInAuth, emailExistsInFirestore } from '../models/userModel.js';

// Função para cadastrar usuário
export const signupUser = async (email, password, nome) => {
  await emailExistsInAuth(email);
  await emailExistsInFirestore(email);

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    email: user.email,
    nome,
  });

  return { message: 'Usuário cadastrado com sucesso!', user: { uid: user.uid, email: user.email, nome } };
};

// Função para login do usuário
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return { message: 'Login bem-sucedido', uid: user.uid, email: user.email };
};



// Função para deletar a conta do usuário
export const deleteUserAccount = async (uid) => {
  const user = auth.currentUser;
  if (user && user.uid === uid) {
    await deleteUser(user);
  } else {
    throw new Error('Usuário não autenticado ou UID inválido');
  }
};

// Função para enviar o link de redefinição de senha
export const sendPasswordResetLink = async (email) => {
  await sendPasswordResetEmail(auth, email);
};