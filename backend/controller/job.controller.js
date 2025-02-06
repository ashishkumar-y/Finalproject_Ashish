import { Company } from "../model/company.model.js";
import { Job } from "../model/job.model.js";
import mongoose from "mongoose";

// Create a job (Admin only)
export const postJob = async (req, res) => {
    const { tittle, description, requirements, salary, location, jobType, position, experience, companyId } = req.body;
    const userId = req.id;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return res.status(404).json({ success: false, message: 'Invalid company ID' });
    }
    const companyDetail = await Company.findById(companyId);
    if (!companyDetail) {
        return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const newJob = new Job({
        tittle,
        description,
        requirements: requirements.split(","),
        salary,
        location,
        jobType,
        experience,
        position,
        companyId,
        company: companyDetail.name,
        createdBy: userId,
    });

    try {
        const savedJob = await newJob.save();
        return res.status(200).json({ success: true, message: 'Job created successfully', data: savedJob });
    } catch (err) {
        return res.status(404).json({ success: false, message: 'Failed to create job', error: err.message });
    }
};

// Get all jobs (User search)
export const allJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { tittle: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate("companyId");
        if (!jobs.length) {
            return res.status(400).json({ success: false, message: "No jobs found" });
        }

        return res.status(200).json({ success: true, totalJobs: jobs.length, jobs });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Get job by ID
export const searchJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("companyId").populate("applications");
        if (!job) {
            return res.status(404).json({ success: false, message: 'No job found with this ID' });
        }
        return res.status(200).json({ success: true, message: 'Job fetched successfully', data: job });
    } catch (err) {
        return res.status(404).json({ success: false, message: 'Failed to fetch job', error: err.message });
    }
};

// Get all jobs posted by admin
export const getAdminJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.id }).populate("company");
        if (!jobs.length) {
            return res.status(404).json({ success: false, message: 'No jobs found' });
        }
        return res.status(200).json({ success: true, message: 'Jobs fetched successfully', totalJobs: jobs.length, data: jobs });
    } catch (err) {
        return res.status(404).json({ success: false, message: 'Failed to fetch jobs', error: err.message });
    }
};



// Remove job
export const removeJob = async (req, res) => {
    try {
        const result = await Job.deleteMany({ tittle: req.body.tittle });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ success: true, message: "Job removed successfully" });
    } catch (err) {
        return res.status(404).json({ success: false, message: "Failed to remove job", error: err.message });
    }
};
