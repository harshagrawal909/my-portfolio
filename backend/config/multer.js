import multer from "multer";
import cloudinary from "./cloudinary.js"
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: "portfolio-resume",
    resource_type: "raw",
    format: "pdf",
    public_id: "resume-" + Date.now(),
  }
});

const upload = multer({ storage });

export default upload;