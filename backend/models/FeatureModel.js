import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
},
    { timestamps: true }
);

const Feature = mongoose.model('feature', featureSchema);

export default Feature