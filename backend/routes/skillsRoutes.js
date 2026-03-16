import { Router } from "express"
const router = Router();
import {getSkills, addSkill, deleteSkill} from "../controllers/skillsController.js"
import authMiddleware from "../middleware/authMiddleware.js"

router.get("/", getSkills);
router.post("/", authMiddleware, addSkill);
router.delete("/:id", authMiddleware, deleteSkill);

export default router;