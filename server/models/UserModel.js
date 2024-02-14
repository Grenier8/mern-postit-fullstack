import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 50
    },
    friends: {
        type: Array,
        default: []
    },
    location: String,
    ocuppation: String,
    picturePath: {
        type: String,
        default: ""
    },
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true });

export default model("User", userSchema);