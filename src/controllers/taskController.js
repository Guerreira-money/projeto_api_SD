import { addTask, getTasks, updateTask, deleteTask } from "../services/add_tasks_service.js";
import { validateTaskData } from "../utils/validateUtils.js";



// Controlador para criar tarefas
export const createTask = async (req, res) => {
  const { name, description, date_initial, date_finish, time, task_category } = req.body;
  
  try {
    // Validar os dados da tarefa (se necessário, você pode implementar uma função de validação)
    validateTaskData(req.body);
    
    // Adicionar tarefa através do serviço
    const taskId = await addTask(req.auth.uid, {
      name,
      description,
      date_initial,
      date_finish,
      time,
      task_category
    });

    res.status(201).json({ message: "Tarefa criada com sucesso!", taskId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para listar tarefas
export const listTasks = async (req, res) => {
  try {
    const tasks = await getTasks(req.auth.uid); // Passando o UID do usuário autenticado
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const modifyTask = async (req, res) => {
  const { taskId } = req.params; // Pega o ID da tarefa da URL
  const { name, description, date_initial, date_finish, time, task_category } = req.body;

  const taskData = { date_initial, date_finish, time };

  // Verificar se o usuário está tentando alterar campos não permitidos
  if (name || description || task_category) {
    return res.status(400).json({
      message: "Crie uma nova tarefa! Os campos não podem ser alterados."
    });
  }

  // Filtrar campos com valores definidos
  const filteredTaskData = Object.fromEntries(
    Object.entries(taskData).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(filteredTaskData).length === 0) {
    return res.status(400).json({
      message: "Nada foi alterado. Tente atualizar a data ou o horário."
    });
  }

  try {
    // Chama o serviço para atualizar a tarefa
    const message = await updateTask(req.auth.uid, taskId, filteredTaskData);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Controlador para deletar tarefas
export const removeTask = async (req, res) => {
  const { id } = req.params;
  
  try {
    await deleteTask(req.auth.uid, id);
    res.json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
