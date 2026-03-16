import Skill from "../models/Skill.js"

export const getSkills = async (req,res) => {
    const skills = await Skill.find();
    res.json(skills);
}

export const addSkill = async(req,res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        console.log("added skill ");
        res.json(skill);
    } catch (error) {
        console.log("Error adding Skill");
    }
}

export const deleteSkill = async(req,res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Skill ID is required" });
        }
        const deletedSkill = await Skill.findByIdAndDelete(id);
        if (!deletedSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        console.log("error delete skills ",error);
    }
}