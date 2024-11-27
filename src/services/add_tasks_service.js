import { db } from '../config/firebaseconfig.js';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { updateDoc, deleteDoc, getDocs } from 'firebase/firestore';


//serviço para criação de tarefas
export const addTask = async (uid, taskData) => {
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  // Referência da coleção de tarefas do usuário
  const tasksRef = collection(db, `users/${uid}/tasks`);

  // Adicionar a tarefa ao Firestore
  const docRef = await addDoc(tasksRef, {
    ...taskData, // Inclui todos os dados fornecidos
    task_category: {
      task: taskData.task_category?.task || null, // Caso não exista, define como null
      event: taskData.task_category?.event || null, // Caso não exista, define como null
    },
    createdAt: serverTimestamp(),
  });

  return docRef.id; // Retorna o ID do documento criado
};

export const getTasks = async (uid) => {
  const tasksRef = collection(db, `users/${uid}/tasks`);
  const snapshot = await getDocs(tasksRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  };

// Função para atualizar a tarefa
export const updateTask = async (uid, taskId, taskData) => {
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  // Referência para o documento da tarefa que será atualizado
  const taskRef = doc(db, `users/${uid}/tasks/${taskId}`);

  try {
    // Atualiza a tarefa com os novos dados
    await updateDoc(taskRef, taskData);
    return "Tarefa atualizada com sucesso!";
  } catch (error) {
    throw new Error("Erro ao atualizar a tarefa: " + error.message);
  }
};


export const deleteTask = async (uid, taskId) => {
  const taskRef = doc(db, `users/${uid}/tasks`, taskId);
  await deleteDoc(taskRef);
};

   




