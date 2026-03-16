import { Router } from "express"
const router = Router();
import { uploadResume, getResume} from "../controllers/resumeController.js";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.get("/",getResume);
router.post("/upload",authMiddleware,upload.single("resume"),uploadResume);

export default router;