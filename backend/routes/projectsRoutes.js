import { Router } from "express";
const router = Router();
import { getProjects,addProject,deleteProject } from "../controllers/projectsController.js";
import authMiddleware from "../middleware/authMiddleware.js"

router.get("/", getProjects);
router.post("/", authMiddleware, addProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;