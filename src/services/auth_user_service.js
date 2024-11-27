import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  deleteUser, 
  sendPasswordResetEmail,
  getAuth
} from 'firebase/auth';
import { auth } from '../config/firebaseconfig.js';
import { db } from '../config/firebaseconfig.js';
import {doc, addDoc, writeBatch, collection, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import admin from '../config/firebaseAdmin.js';



// Função para cadastrar usuário
export const signupUser = async (email, password, nome) => {
  // Inicializar o Firebase Authentication
  const auth = getAuth();

  // Criar usuário com Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Cadastro no Firestore
  const userRef = doc(db, 'users', user.uid); // Corrigido erro na referência
  await setDoc(userRef, {
    uid: user.uid,
    nome,
    email: user.email, // Corrigido o erro de digitação "emai"
    createdAt: new Date().toISOString(),
  });

  return {
    message: "Usuário cadastrado com sucesso!",
    user: {
      uid: user.uid,
      email: user.email,
      nome,
    },
  };
};

// Função para login do usuário
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return { message: 'Login bem-sucedido', uid: user.uid, email: user.email };
};

// Serviço para deletar a conta do usuário
export const deleteUserAccount = async (uid) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || user.uid !== uid) {
      throw new Error('Usuário não autenticado ou UID inválido');
    }

    // Referências do Firestore
    const userRef = doc(db, 'users', uid);
    const tasksRef = collection(db, `users/${uid}/tasks`);

    // Deletar todas as tarefas associadas ao usuário
    const tasksSnapshot = await getDocs(tasksRef);
    const batch = writeBatch(db); // Usando batch para deletar de forma eficiente
    tasksSnapshot.forEach((taskDoc) => {
      batch.delete(taskDoc.ref);
    });
    await batch.commit();

    // Deletar o documento do usuário
    await deleteDoc(userRef);

    // Deletar a autenticação do usuário
    await admin.auth().deleteUser(uid);
    


    return { success: true, message: 'Conta e dados do usuário deletados com sucesso!' };
  } catch (error) {
    throw new Error('Erro ao deletar a conta do usuário: ' + error.message);
  }
};


// Função para enviar o link de redefinição de senha
export const sendPasswordResetLink = async (email) => {
  await sendPasswordResetEmail(auth, email);
};