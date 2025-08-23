import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/user.js";
import sendToken from "../utils/sendToken.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";

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

// get current user profile => /api/v1/user
export const getCurrentUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user_id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    user,
  });
});

// update passwrod => /api/v1/password/update
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findByID(req?.user._id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old password is incorrect", 404));
  }

  user.password = req.body.password;

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//update profile => /api/v1/user/update_profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  // new data
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user_id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});


// get all user - ADMIN - /api/v1/admin/users
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  
  const users = await User.find();

  res.status(200).json({
    users,
  })
})

// find user by id - ADMIN - /api/v1/admin/users/:id
export const getUserDetails = catchAsyncError( async(req, res , next) => {
  const user = await User.findById(req?.params?.id);

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    user,
  })
})

//find user by id and update - ADMIN = /api/v1/admin/users/:id
export const updateUser = catchAsyncError(async (req, res, next) => {
  
  // new user data
  const newUserData = {
    name: req?.body?.name,
    email: req?.body?.email,
    role: req?.body?.role,
  }

  const user = await User.findByIdAndUpdate(req?.user_id, newUserData, {new: true});

  res.status(200).json({
    user,
  })
})


// delete user - ADMIN => /api/v1/admin/users/:id
export const deleteUser = catchAsyncError( async(req, res, next) => {

  const user = await User.findById(req?.params?.id);

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }

  await user.deleteOne();

  res.status(200).json({
    succes: true,
  })
})


//forgotPassword => /api/v1/password/reset
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token from user model method
  const resetToken = user.getResetPasswordToken();

  // Save without running validation (because only reset fields are set)
  await user.save({ validateBeforeSave: false });

  // Reset password URL
  const resetURL = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  // Email template
  const message = getResetPasswordTemplate(user?.name, resetURL);

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    // If email fails, clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error?.message, 500));
  }
});
