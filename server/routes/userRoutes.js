import express from "express"
import { authController } from "../controllers/userController/authController.js";
const router = express.Router();

router.post('/auth', authController)

export default router;