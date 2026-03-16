import { Router } from "express";
const router = Router();
import { loginAdmin } from "../controllers/authController.js"

router.post("/login",loginAdmin);

export default router;