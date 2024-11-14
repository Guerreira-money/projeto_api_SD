import { db } from '../config/firebaseconfig.js';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';

// Função para criar uma nova tarefa
export const createTask = async (taskData) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      name: taskData.name,
      description: taskData.description || "",
      date_initial: taskData.date_initial,
      date_finish: taskData.date_finish,
      time: taskData.time,
      task_category: {
        task: taskData.task || "",
        event: taskData.event || ""
      },
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error("Erro ao criar tarefa: " + error.message);
  }
};

// Função para atualizar uma tarefa
export const updateTask = async (id, updateData) => {
  try {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updateData);
    return { message: "Tarefa atualizada com sucesso!" };
  } catch (error) {
    throw new Error("Erro ao atualizar tarefa: " + error.message);
  }
};

// Função para deletar uma tarefa
export const deleteTask = async (id) => {
  try {
    await deleteDoc(doc(db, "tasks", id));
    return { message: "Tarefa deletada com sucesso!" };
  } catch (error) {
    throw new Error("Erro ao deletar tarefa: " + error.message);
  }
};

// Função para obter uma tarefa pelo ID
export const getTask = async (id) => {
  try {
    const taskRef = doc(db, "tasks", id);
    const taskDoc = await getDoc(taskRef);
    return taskDoc.exists() ? taskDoc.data() : null;
  } catch (error) {
    throw new Error("Erro ao buscar tarefa: " + error.message);
  }
};

// Função para obter todas as tarefas
export const getAllTasks = async () => {
  try {
    const tasksSnapshot = await getDocs(collection(db, "tasks"));
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (error) {
    throw new Error("Erro ao buscar tarefas: " + error.message);
  }
};
