import express from 'express';
import {addTaskTest, updateTaskController, deleteTaskController, getTaskController, getAllTasksController } from '../controllers/taskController.js';


const router = express.Router();

// Rota para criar uma nova tarefa

router.post('/tasks', async (req, res) => {
    try {
      await addTaskTest(req.body);
      res.status(201).send("Tarefa adicionada com sucesso!");
    } catch (error) {
      res.status(500).send("Erro ao adicionar a tarefa.");
    }
  });
  

// Rota para atualizar uma tarefa
router.put('/tasks/:id', updateTaskController);

// Rota para deletar uma tarefa
router.delete('/tasks/:id', deleteTaskController);

// Rota para obter uma tarefa pelo ID
router.get('/tasks/:id', getTaskController);

// Rota para obter todas as tarefas
router.get('/tasks', getAllTasksController);

export default router;
