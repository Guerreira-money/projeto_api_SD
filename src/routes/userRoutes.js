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

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/signup", signup); // Cadastro

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login); // Entrar

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a user account
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete", deleteUser); // Deletar conta

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change password for logged in user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/change-password", changePassword); // Altera a senha do usuário logado

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset link
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Bad request
 */
router.post("/forgot-password", resetPasswordController); // Rota para solicitar a redefinição de senha (enviar link por e-mail)

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 */
router.post("/reset-password", updatePasswordForUserController); // Rota para redefinir a senha usando o token do link

export default router;
