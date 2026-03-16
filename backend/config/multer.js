import multer from "multer";
import cloudinary from "./cloudinary.js"

const storage = multer.ClodinaryStorage({
  cloudinary,
  params:{
    folder: " portfolio-resume",
    resource_type: "auto",    
    allowed_formats: ['pdf'],
  }
});

const upload = multer({ storage });

export default upload;