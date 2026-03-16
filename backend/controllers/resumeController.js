import Resume from "../models/Resume.js"

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        await Resume.deleteMany();
        const resume = new Resume({
            fileName: req.file.originalname,
            mimeType: req.file.mimetype,
            fileData: req.file.buffer
        });

        await resume.save();

        res.json({
            message: "Resume uploaded",
            resume: {
                _id: resume._id,
                fileUrl: `/api/resume/file/${resume._id}`,
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

        const hasBinaryFile = resume.fileData && resume.fileData.length > 0;
        const legacyFileUrl = resume.fileUrl;

        res.json({
            _id: resume._id,
            fileUrl: hasBinaryFile ? `/api/resume/file/${resume._id}` : legacyFileUrl,
            uploadedAt: resume.uploadedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getResumeFile = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        if (!resume.fileData) {
            return res.status(404).json({ message: "No file data found. Please upload resume again." });
        }

        res.setHeader("Content-Type", resume.mimeType || "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename="${resume.fileName}"`);
        return res.send(resume.fileData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};