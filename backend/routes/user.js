import express from "express";
import {allUsers, createUserJobsHistory, deleteUser, editUser, singleUser} from '../controllers/user-controller.js';
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { userProfile } from "../controllers/auth-controller.js";


const router = express.Router();

//auth routes

router.get('/allusers', isAuthenticated,isAdmin, allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated,isAdmin, deleteUser);
router.post('/user/jobhistory', isAuthenticated,createUserJobsHistory);

export {router as UserRouter}