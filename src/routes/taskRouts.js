
import { Router } from 'express';
import { createTask, listTasks, modifyTask, removeTask } from '../controllers/taskController.js';
import { verifyAuth } from "../middlewares/authMiddleware.js";
const router = Router();

// Rota protegida para criar tarefas
router.post("/create", verifyAuth, createTask);


// Rota para listar todas as tarefas do usuário autenticado
router.get('/:uid/tasks', verifyAuth, listTasks);



// Rota para atualizar uma tarefa
router.put('/update/:taskId', verifyAuth, modifyTask);



// Rota para deletar uma tarefa
router.delete('/delete/:id', verifyAuth, removeTask);

export default router;
