import express from "express";
import {isAdmin, isAuthenticated } from "../middleware/auth.js";
import {allJobsType, createJobType, deleteJobType, updateJobType} from "../controllers/jobtype-controller.js";
const router = express.Router();

//auth routes

router.post('/type/create', isAuthenticated,isAdmin,createJobType);
router.get('/type/jobs', allJobsType);
router.put('/type/update/:type_id',isAuthenticated,isAdmin,updateJobType)
router.delete('/type/delete/:type_id',isAuthenticated,isAdmin,deleteJobType)



export {router as JobTypeRouter}