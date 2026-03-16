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
            fileUrl,
            publicId: req.file.filename,
            resourceType: "raw"
        });

        await resume.save();

        res.json({
            message: "Resume uploaded successfully to cloudinary",
            resume: {
                _id: resume._id,
                fileUrl: `/api/resume/file/${resume._id}`,
                downloadUrl: `/api/resume/file/${resume._id}?download=1`,
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

        res.json({
            _id: resume._id,
            fileName: resume.fileName,
            mimeType: resume.mimeType,
            fileUrl: `/api/resume/file/${resume._id}`,
            downloadUrl: `/api/resume/file/${resume._id}?download=1`,
            uploadedAt: resume.uploadedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getResumeFile = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id).lean();

        if (!resume?.fileUrl) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const response = await fetch(resume.fileUrl);

        if (!response.ok) {
            return res.status(502).json({ message: "Failed to fetch resume file from storage" });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const shouldDownload = req.query.download === "1";

        res.setHeader("Content-Type", resume.mimeType || "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `${shouldDownload ? "attachment" : "inline"}; filename="${resume.fileName || "resume.pdf"}"`
        );
        res.setHeader("Content-Length", buffer.length.toString());

        return res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
