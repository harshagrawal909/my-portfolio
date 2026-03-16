import multer from "multer";
import cloudinary from "./cloudinary.js"
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: "portfolio-resume",
    resource_type: "raw"
  }
});

const upload = multer({ storage });

export default upload;