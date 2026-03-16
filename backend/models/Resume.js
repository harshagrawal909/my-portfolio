import {Schema, model} from "mongoose"

const resumeSchema = new Schema({
    fileUrl: {
        type: String,
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

export default model("Resume", resumeSchema);