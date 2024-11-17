import { Router } from "express";
import {
  signup,
  login,
  deleteUser,
  changePassword,
  updatePasswordForUserController,
  resetPasswordController,
} from "../controllers/userController.js";

const router = Router();

router.post("/signup", signup); // Cadastro

router.post("/login", login); // Entrar

router.delete("/delete", deleteUser); // Deletar conta

router.post("/change-password", changePassword); // Altera a senha do usuário logado

router.post("/forgot-password", resetPasswordController); // Rota para solicitar a redefinição de senha (enviar link por e-mail)

router.post("/reset-password", updatePasswordForUserController); // Rota para redefinir a senha usando o token do link

export default router;
