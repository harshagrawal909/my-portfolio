import {Schema,model} from "mongoose"

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    tech: [String],
    github: [String],
    demo:[String],

}, { timestamps: true });

export default model("Project",ProjectSchema);