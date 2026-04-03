import Resume from "../models/Resume.js";
import s3Client from "../config/r2.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File required" });

        // 1. Delete existing resume from R2
        const oldResume = await Resume.findOne();
        if (oldResume?.publicId) {
            await s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: oldResume.publicId
            }));
            await Resume.deleteMany();
        }

        // 2. Upload to R2
        const key = `resumes/${Date.now()}-${req.file.originalname}`;
        const publicUrl = `https://pub-865aa0c658e740ff8411427d79f531d6.r2.dev/${key}`;
        const parallelUpload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            },
        });
        await parallelUpload.done();

        // 3. Save to DB
        const resume = new Resume({
            fileName: req.file.originalname,
            mimeType: req.file.mimetype,
            fileUrl: publicUrl, 
            publicId: key
        });
        await resume.save();

        res.json({ message: "Resume updated", resume });
    } catch (error) {
        console.error("UPLOAD ERROR FULL:", error); 
        console.error("MESSAGE:", error.message);
        console.error("STACK:", error.stack);
        res.status(500).json({ message: error.message });
    }
};

export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne().sort({ uploadedAt: -1 }).lean();
        if (!resume) return res.json(null);

        res.json({
            _id: resume._id,
            fileName: resume.fileName,
            fileUrl: resume.fileUrl,
            downloadUrl: resume.fileUrl
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};