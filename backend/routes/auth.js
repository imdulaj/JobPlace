import express from "express";
import {logout, signin, signup, userProfile} from '../controllers/auth-controller.js';
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

//auth routes

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/me',isAuthenticated, userProfile);

export {router as AdminRouter}