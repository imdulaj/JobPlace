import ErrorResponse from '../utils/errorResponse.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';

// Check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorResponse('No user found with this ID', 404));
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
};


//middleware for admin
export const isAdmin = (req, res, next) => {
    if(req.user.role === 0){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    next();
}