import ErrorResponse from "../utils/errorResponse.js";
import { JobType } from "../models/JobTypeModel.js";

// create job category
export const createJobType = async(req, res, next) => {
    try {
        const jobT = await JobType.create({
            jobtypeName: req.body.jobtypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}


// all jobs category
export const allJobsType = async(req, res, next) => {
    try {
        const jobT = await JobType.find();
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//update job type
export const updateJobType = async(req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, {new: true});
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//delete job type
export const deleteJobType = async(req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        res.status(201).json({
            success: true,
            message:"Job type deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}