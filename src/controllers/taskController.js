import { db } from '../config/firebaseconfig.js';

import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Função para adicionar uma tarefa
export const addTaskTest = async (taskData) => {
  const { name, description, date_initial, date_finish, time, task_category } = taskData;

  try {
    // Consulta para verificar se já existe uma tarefa com as mesmas datas e o mesmo nome
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("date_initial", "==", date_initial),
      where("date_finish", "==", date_finish),
      where("name", "==", name)
    );

    const querySnapshot = await getDocs(q);

    // Se encontrar uma tarefa com as mesmas datas e o mesmo nome, impede a criação
    if (!querySnapshot.empty) {
      console.log("Uma tarefa com as mesmas datas e o mesmo nome já existe e está vigente.");
      return;
    }

    // Se não encontrar nenhuma tarefa vigente com o mesmo nome e datas, cria a nova tarefa
    const docRef = await addDoc(tasksRef, {
      name,
      description: description || "",
      date_initial,
      date_finish,
      time,
      task_category: {
        task: task_category?.task || "",
        event: task_category?.event || ""
      },
      createdAt: serverTimestamp(),
    });

    console.log("Tarefa adicionada com sucesso! ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
};

// Função para obter todas as tarefas
export const getAllTasks = async () => {
  const tasksRef = collection(db, "tasks");
  const querySnapshot = await getDocs(tasksRef);
  const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return tasks;
};

// Função para obter uma tarefa pelo ID
export const getTask = async (id) => {
  const docRef = doc(db, "tasks", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

// Função para atualizar uma tarefa
export const updateTask = async (id, taskData) => {
  const docRef = doc(db, "tasks", id);
  await updateDoc(docRef, taskData);
};

// Função para deletar uma tarefa
export const deleteTask = async (id) => {
  const docRef = doc(db, "tasks", id);
  await deleteDoc(docRef);
};

// Controlador para atualizar uma tarefa
export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    await updateTask(id, req.body);
    res.json({ message: "Tarefa atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar uma tarefa
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obter uma tarefa pelo ID
export const getTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTask(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Tarefa não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obter todas as tarefas
export const getAllTasksController = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};