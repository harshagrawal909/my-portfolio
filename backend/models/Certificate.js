import {Schema,model} from "mongoose"

const CertificateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    description: String,
    link: {
        type: String,
        required: true
    },
    verified: Boolean,
    order: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default model("Certificate",CertificateSchema);