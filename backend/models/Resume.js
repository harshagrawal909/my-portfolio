import {Schema, model} from "mongoose"

const resumeSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },

    mimeType: {
        type: String,
        required: true
    },

    fileData: {
        type: Buffer,
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

export default model("Resume", resumeSchema);