import mongoose from "mongoose";


const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "company name can not be Empty"],
        unique: [true, "company already Registered"]
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })



export const Company = mongoose.model('Company', companySchema,)