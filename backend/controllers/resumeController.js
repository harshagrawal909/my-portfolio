import Resume from "../models/Resume.js"

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const fileUrl = req.file.path || req.file.secure_url;

        if (!fileUrl) {
            return res.status(500).json({ message: "Resume URL was not generated" });
        }

        await Resume.deleteMany();
        const resume = new Resume({
            fileName: req.file.originalname,
            mimeType: req.file.mimetype,
            fileUrl
        });

        await resume.save();

        res.json({
            message: "Resume uploaded successfully to cloudinary",
            resume: {
                _id: resume._id,
                fileUrl: resume.fileUrl,
                uploadedAt: resume.uploadedAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne().sort({ uploadedAt: -1 }).lean();

        if (!resume) {
            return res.json(null);
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
