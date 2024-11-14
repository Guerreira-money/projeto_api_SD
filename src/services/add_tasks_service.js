import { db } from '../config/firebaseconfig.js'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const addTaskTest = async (taskData) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      name: taskData.name || "Teste de Tarefa",
      description: taskData.description || "",
      date_initial: taskData.date_initial || "2024-11-06",
      date_finish: taskData.date_finish || "2024-11-10",
      time: taskData.time || "12:00",
      task_category: {
        task: taskData.task_category?.task || "",
        event: taskData.task_category?.event || ""
      },
      createdAt: serverTimestamp(),
    });
    console.log("Tarefa adicionada com sucesso! ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
};