import mongoose from "mongoose";
import { genSalt } from 'bcrypt';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "UserName can not be Empty"],
        minlength: [3, "Name must be at least 3 digits"],
        maxlength: [15, "Name cannot exceed 15 digits"],
    },
    email: {
        type: String,
        required: [true, "Email can not be Empty"],
        unique: [true, "Email already Exist"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email Pattern"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number cannot be empty"],
        unique: [true, "Phone Number already exists"],
        minlength: [10, "Phone Number must be at least 10 digits"],
        maxlength: [10, "Phone Number cannot exceed 10 digits"],
    },
    password: {
        type: String,
        required: [true, "Password can not be Empty"]
    },
    role: {
        type: String,
        emum: ['student', 'recruiter'],
        required: [true, "Role cannot be empty"],
    },
    profile: {
        profession: { type: String,  default: "" },
        bio: { type: String },
        skills: [{ type: String, default: "" }],
        resume: { type: String },
        resumeName: { type: String },
        // company: { type: mongoose.Schema.Types.ObjectId, ref: Company },
        profilePhoto: { type: String,},
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.password) {
        return next(new Error('Password required'))
    }

    try {
        const salt = await genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } catch (err) {
        next(err)
    }
});

export const User = mongoose.model("User", userSchema)

