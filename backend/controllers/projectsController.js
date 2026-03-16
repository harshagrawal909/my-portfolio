import Project from "../models/Project.js"

export const getProjects = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
}

export const addProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: "Error adding project", error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedProject = await Project.findByIdAndDelete(id);
        
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        res.json({ message: "Project Deleted" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server Error" });
    }
}