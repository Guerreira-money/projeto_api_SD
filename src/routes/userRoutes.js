import { Router } from 'express';
import { signup, login, deleteAccount, changePassword } from '../controllers/userController.js';
import { resetPasswordController } from '../controllers/userController.js';
import { verifyAuth } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/signup', signup); // Cadastro
router.post('/login', login); // Entrar
router.delete('/delete-account', verifyAuth, deleteAccount);

router.post('/change-password', verifyAuth, changePassword); // Altera a senha do usuário logado

// Rota para solicitar a redefinição de senha (enviar link por e-mail)
router.post('/forgot-password', resetPasswordController);




export default router;
