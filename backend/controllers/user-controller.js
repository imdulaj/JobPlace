import ErrorResponse from "../utils/errorResponse.js";
import { User } from "../models/UserModel.js";

//load all users
export const allUsers = async (req, res, next) => {

    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();



    try {
        const users = await User.find().sort({createdAt: -1}).select('-password')
        .skip(pageSize * (page-1))
        .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (error) {
        return next (error);
    }
}

//show single user

export const singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success:true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//edit user

export const editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json({
            success:true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}



//delete user

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            // User not found
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        // Handle unexpected errors
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//jobs history

export const createUserJobsHistory  = async (req, res, next) => {
    const {title, description, salary, location} = req.body;

    try {
        const currentUser = await User.findOne({_id: req.user._id});
        if(!currentUser){
            return next(new ErrorResponse("You must log In",401));
        }
        else{
            const addJobHistory = {
                title, 
                description, 
                salary, 
                location,
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory)
            await currentUser.save();
        }
        
        res.status(200).json({
            success:true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}