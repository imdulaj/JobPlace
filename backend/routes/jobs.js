import express from "express";
import {createJob, showJobs, singleJob, updateJob} from '../controllers/jobs-controller.js';
import {isAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

//auth routes

router.post('/job/create', isAuthenticated,isAdmin,createJob);
router.get('/job/:id', singleJob);
router.put('/job/update/:job_id', isAuthenticated,isAdmin,updateJob);
router.get('/jobs/show',showJobs);


export {router as JobRouter}