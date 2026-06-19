import { Router } from "express";
const router = Router();
import { getCertificates,addCertificate,deleteCertificate,updateCertificate } from "../controllers/certificateController.js";
import authMiddleware from "../middleware/authMiddleware.js"

router.get("/", getCertificates);
router.post("/", authMiddleware, addCertificate);
router.delete("/:id", authMiddleware, deleteCertificate);
router.put("/:id", authMiddleware, updateCertificate);

export default router;