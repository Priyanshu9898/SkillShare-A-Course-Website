import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) return next(new ErrorHandler("Not Logged In", 401));
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    req.user = await User.findById(decoded._id);
  
    next();
  });


export const authorizedSubscriber = (req,res, next) => {
    if(req.user.subscription.status !== "active" && req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 401));
    };

    next();
}

export const authorizedAdmin = (req,res, next) => {
    if(req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 401));
    };

    next();
}