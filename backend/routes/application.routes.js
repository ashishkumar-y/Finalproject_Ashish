import express from "express";
import { verifyJwt } from "../config/jwtVerify.js";
import { 
    applyJob, 
    getAppliedJob, 
    getAppliedUsers, 
    updateStatus 
} from "../controller/application.controller.js";

const routes = express.Router();

routes.get("/apply/:id", verifyJwt, applyJob); // Apply for a job
routes.get("/get", verifyJwt, getAppliedJob); // Get applied jobs for a user
routes.get("/:id/applicants", verifyJwt, getAppliedUsers); // Get applicants for a job
routes.post("/status/:id/update/", verifyJwt, updateStatus); // Update application status

export default routes;
