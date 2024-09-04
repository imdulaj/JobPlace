import ErrorResponse from "../utils/errorResponse.js";
import { Job } from "../models/JobModel.js";
import { JobType } from "../models/JobTypeModel.js";

// Create job 
export const createJob = async(req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobtype: req.body.jobtype,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
}

// Get single job
export const singleJob = async(req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return next(new ErrorResponse("Job not found", 404));
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
}

// Update job by id
export const updateJob = async(req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
            .populate('jobtype', 'jobtypeName')
            .populate('user', 'firstName lastName');

        if (!job) {
            return next(new ErrorResponse("Job not found", 404));
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
}

// Show jobs
export const showJobs = async (req, res, next) => {
    try {
        // Enable search
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        // Filter jobs by category
        let categ = req.query.cat && req.query.cat !== '' 
            ? req.query.cat 
            : undefined;

        // Jobs by location
        const jobLocations = await Job.distinct('location');
        let locationFilter = req.query.location && req.query.location !== '' 
            ? req.query.location 
            : undefined;

        // Enable pagination
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;

        // Build query object
        let queryObj = { ...keyword };
        if (categ) queryObj.jobType = categ;
        if (locationFilter) queryObj.location = locationFilter;

        // Log the query and filters
        console.log('Query Object:', queryObj);

        const count = await Job.countDocuments(queryObj);

        const jobs = await Job.find(queryObj)
            .sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        // Log the result of the query
        console.log('Jobs found:', jobs);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation: jobLocations
        });
    } catch (error) {
        next(error);
    }
}



// import ErrorResponse from "../utils/errorResponse.js";
// import { Job } from "../models/JobModel.js";
// import { JobType } from "../models/JobTypeModel.js";

// // create job 
// export const createJob = async(req, res, next) => {
//     try {
//         const job = await Job.create({
//             title: req.body.title,
//             description: req.body.description,
//             salary: req.body.salary,
//             location: req.body.location,
//             jobtype: req.body.jobtype,
//             user: req.user.id
            
//         });
//         res.status(201).json({
//             success: true,
//             job
//         })
//     } catch (error) {
//         next(error);
//     }
// }

// // single job
// export const singleJob = async(req, res, next) => {
//     try {
//         const job = await Job.findById(req.params.id);
//         res.status(200).json({
//             success: true,
//             job
//         })
//     } catch (error) {
//         next(error);
//     }
// }


// // update job by id
// export const updateJob = async(req, res, next) => {
//     try {
//         const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {new: true}).populate('jobtype','jobtypeName').populate('user','firstName lastName');
//         res.status(200).json({
//             success: true,
//             job
//         })
//     } catch (error) {
//         next(error);
//     }
// }

// // show jobs
// export const showJobs = async(req, res, next) => {

//     //enable search
//     const keyword = req.query.keyword ? {
//          title:{
//             $regex: req.query.keyword,
//             $options: 'i'
//          }
//     } : {}

//     //filter jobs by category
//     let ids = [];
//     const jobTypeCategory = await JobType.find({}, {_id:1});
//     jobTypeCategory.forEach(cat => {
//         ids.push(cat._id);
//     });

//     let cat = req.query.cat;
//     let categ = cat !== '' ? cat : ids;


//     //jobs by location
//     let locations = [];
//     const jobByLocation = await Job.find({} ,{location: 1});
//     jobByLocation.forEach(val => {
//         locations.push(val.location);
//     });
//     let setUniqueLocation = [...new Set(locations)];
//     let location = req.query.location;
//     let locationFilter = location !== '' ? location : setUniqueLocation;

//      //enable pagination
//      const pageSize = 5;
//      const page = Number(req.query.pageNumber) || 1;
//      //const count = await Job.find({}).estimatedDocumentCount();
//      const count = await Job.find({...keyword, jobType: categ, location: locationFilter}).countDocuments();
//     try {
//         const jobs = await Job.find({...keyword, jobType: categ, location: locationFilter}).sort({ createdAt : -1}).skip(pageSize * (page - 1)).limit(pageSize)
//         res.status(200).json({
//             success: true,
//             jobs,
//             page,
//             pages: Math.ceil(count / pageSize),
//             count,
//             setUniqueLocation
            
//         })
//     } catch (error) {
//         next(error);
//     }
// }