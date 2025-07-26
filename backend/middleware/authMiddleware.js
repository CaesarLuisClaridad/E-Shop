import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../model/user.js"
import jwt from "jsonwebtoken"

//for authenticated user only
export const isAuthenticatedUser = catchAsyncError( async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Login first to have an access to this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
})

//for authorize roles
export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not authorized to this resource`, 403));
        }
        next();
    }
}
