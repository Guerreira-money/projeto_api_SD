import { Router } from "express";
import { logoutUser } from "../controllers/logoutController.js";

const router = Router();

// Rota para logout do usuário
router.post("/logout", logoutUser);

export default router;
