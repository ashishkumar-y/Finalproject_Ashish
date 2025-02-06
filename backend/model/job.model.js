import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    tittle: {
        type: String,
        required: [true, "job Tittle can not be Empty"],
    },
    description: {
        type: String,
        required: [true, "job Description can not be Empty"],
    },
    requirements: {
        type: [String],
    },
    salary: {
        type: Number,
        required: [true, "job Salary can not be Empty"],
    },
    location: {
        type: String,
        required: [true, "job Location can not be Empty"],
    },
    experience: {
        type: Number,
        required: [true, "job experience can not be Empty"],
    },
    jobType: {
        type: String,
        required: [true, "job-Type can not be Empty"],
    },
    position: {
        type: Number,
        required: [true, "job Position can not be Empty"],
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, "company ID/name can not be Empty"],
    },
    company: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //admin
        required: [true, "createdBy can not be Empty"],
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }]
}, { timestamps: true })

export const Job = mongoose.model('Job', jobSchema);