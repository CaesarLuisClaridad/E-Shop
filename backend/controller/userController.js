import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/user.js";
import sendToken from "../utils/sendToken.js";

// register user = /api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  // check if the password match
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password do not match", 404));
  }

  // check if the email is already use
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return next(new ErrorHandler("Email already registered", 404));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// login User => /api/v1/login
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  // Find user and select password field
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  // Compare password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  // Get token
  sendToken(user, 200, res);
});

// logout user => /api/v1/logout
export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "User logged out",
  });
});
