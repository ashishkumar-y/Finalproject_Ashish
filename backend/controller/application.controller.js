import { Application } from "../model/application.model.js";
import mongoose from "mongoose";
import { Job } from "../model/job.model.js";
import { populate } from "dotenv";

export const applyJob = async (req, res) => {

    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(404).json({
                success: false,
                message: "Job Id is Required"
            })
        };

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "UserId is required"
            })
        }
        
        //check applied or Not
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(404).json({
                success: false,
                message: "You Already applied For this Job"
            })
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "sorry, No job Found"
            })
        }

        //create new Applicant 
        const newApplicant = await new Application({
            job: jobId,
            applicant: userId,
        })
        await newApplicant.save();


        job.applications.push(newApplicant)
        await job.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully Applied for Job ',
            newApplicant
        })
    } catch (err) {
        console.error("Error in applying for the job:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

//get the job hat user applied
export const getAppliedJob = async (req, res) => {

    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } }
                }
            })

        if (!application || application.length === 0) {
            return res.status(400).json({
                success: true,
                message: "No Application found"
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched all Job applied ',
            jobApplied: application.length,
            data: application
        })

    } catch (err) {
        console.log("Error fetching applied jobs:", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

//get total applicant applied for job
export const getAppliedUsers = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        })

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "job not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successfully found all the users who applied for the job",
            job
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
}

// Update Application Status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        if (!applicationId) {
            return res.status(400).json({
                success: false,
                message: "Application ID is required",
            });
        }
        const statusFinal = status.toLowerCase();
        const updatedApplication = await Application.findOneAndUpdate(
            { _id: applicationId },
            { status: statusFinal },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully updated the status of the application",
            data: updatedApplication,
        });
    } catch (err) {
        console.error(`Error updating application status: ${err.message}`);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};
