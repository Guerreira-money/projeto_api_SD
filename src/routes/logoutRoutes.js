import { Router } from "express";
import { logoutUser } from "../controllers/logoutController.js";

const router = Router();

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", logoutUser); // Rota para logout do usuário

export default router;
