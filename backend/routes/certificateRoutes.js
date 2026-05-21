import { Router } from "express";
const router = Router();
import { getCertificates,addCertificate,deleteCertificate } from "../controllers/certificateController.js";
import authMiddleware from "../middleware/authMiddleware.js"

router.get("/", getCertificates);
router.post("/", authMiddleware, addCertificate);
router.delete("/:id", authMiddleware, deleteCertificate);

export default router;