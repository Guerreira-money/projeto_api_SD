/*import { db } from '../config/firebaseconfig.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Função teste
export const addTaskTest = async () => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      name: "Teste de Tarefa",
      date: "2024-11-06",
      time: "12:00",
      createdAt: serverTimestamp(),
    });
    console.log("Tarefa adicionada com sucesso! ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
};
*/