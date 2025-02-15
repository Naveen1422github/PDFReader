import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    topics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    },
    features: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature',
    },
},
{ timestamps: true });

const User = mongoose.model('user', userSchema);

export default User 

