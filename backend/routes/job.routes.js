import express from "express";
import { verifyJwt } from "../config/jwtVerify.js";
import { 
    postJob, 
    getAdminJobs, 
    removeJob, 
    allJob, 
    searchJobById 
} from "../controller/job.controller.js";




const routes = express.Router();

// Admin routes
routes.post("/add", verifyJwt, postJob); // Add a job
routes.delete("/remove", verifyJwt, removeJob); // Remove a job
routes.get("/getAdminJobs", verifyJwt, getAdminJobs); // Fetch jobs created by admin

// User routes
routes.get("/get", verifyJwt, allJob); // Get all jobs
routes.get("/get/:id", verifyJwt, searchJobById); // Get job by ID

export default routes;
