import ErrorResponse from "../utils/errorResponse.js";
import { User } from "../models/UserModel.js";


export const signup = async (req, res, next) => {
  const { email, firstName, lastName, password, role } = req.body;

  if (!email || !firstName || !lastName || !password || role === undefined) {
    return next(new ErrorResponse("Missing required fields", 400));
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ErrorResponse("Email already registered", 400));
    }

    const user = await User.create({ email, firstName, lastName, password, role });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error during signup:", error.message); // Log detailed error
    next(new ErrorResponse("Internal Server Error", 500)); // Send generic error message to client
  }
};


export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return next(new ErrorResponse("please add an email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("please add a password", 403));
    }

    //check user email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);



  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
    .cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
    .json({
      success: true, 
      role: user.role
    })
}


//logout

export const logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}


//user profile

// user profile controller
export const userProfile = async (req, res, next) => {
  try {
    // Select the necessary fields from the user document
    const user = await User.findById(req.user.id).select('firstName lastName email role createdAt jobsHistory');

    // Respond with the user information
    res.status(200).json({
      success: true,
      user // Returning the user object
    });
  } catch (error) {
    // Handle errors (e.g., user not found)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};
