import { Router } from 'express';
import { signup, login, deleteUser, changePassword, updatePasswordForUserController } from '../controllers/userController.js';
import { resetPasswordController } from '../controllers/userController.js';



const router = Router();

router.post('/signup', signup); // Cadastro
router.post('/login', login); // Entrar
router.delete('/delete', deleteUser); // Deletar conta
router.post('/change-password', changePassword); // Altera a senha do usuário logado

// Rota para solicitar a redefinição de senha (enviar link por e-mail)
router.post('/forgot-password', resetPasswordController);

// Rota para redefinir a senha usando o token do link
router.post('/reset-password', updatePasswordForUserController);


export default router;
