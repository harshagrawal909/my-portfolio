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

    fileUrl: {
        type:String,
        required:true
    },

    publicId: {
        type: String,
        required: false
    },

    resourceType: {
        type: String,
        default: "raw"
    },

    fileData: {
        type: Buffer,
        required: false
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

export default model("Resume", resumeSchema);