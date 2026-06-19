import Certificate from "../models/Certificate.js"

export const getCertificates = async (req, res) => {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json(certificates);
}

export const addCertificate = async (req, res) => {
    try {
        const { order } = req.body;
        if (order && order > 0) {
            await Certificate.updateMany({ order: { $gte: order } }, { $inc: { order: 1 } });
        }
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.status(201).json(certificate);
    } catch (error) {
        res.status(400).json({ message: "Error adding Certificate", error: error.message });
    }
}

export const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedCertificate = await Certificate.findByIdAndDelete(id);
        
        if (!deletedCertificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        
        res.json({ message: "Certificate Deleted" });
    } catch (error) {
        console.error("Error deleting Certificate:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const { order } = req.body;
        if (order && order > 0) {
            await Certificate.updateMany(
                { _id: { $ne: id }, order: { $gte: order } },
                { $inc: { order: 1 } }
            );
        }
        const updatedCertificate = await Certificate.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!updatedCertificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        
        res.json(updatedCertificate);
    } catch (error) {
        console.error("Error updating Certificate:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}