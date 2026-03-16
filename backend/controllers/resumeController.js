import Resume from "../models/Resume.js"

export const uploadResume = async (req, res) => {
    try {
        const fileUrl = `/uploads/${req.file.filename}`;
        await Resume.deleteMany();
        const resume = new Resume({ fileUrl });
        await resume.save();
        res.json({
        message: "Resume uploaded",
        resume
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getResume = async (req, res) => {
    const resume = await Resume.findOne();
    res.json(resume);
};