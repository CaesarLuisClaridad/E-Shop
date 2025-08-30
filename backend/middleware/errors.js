import ErrorHandler from "../utils/errorHandler.js";

// middleware/errors.js
export default (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  //handle mongoose duplicate key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    error = new ErrorHandler(message, 401);
  }

  //handling invalid JWT Token
  if(err.name === "JsonWebTokenError"){
    const message = "Json Web Token not found. Invalid",
    error = new ErrorHandler(message, 400);
  }

  //handling JWT Expired Token
  if(err.name === "TokenExpiredError"){
    const message = "Json Web Token is expired. Invalid",
    error = new ErrorHandler(message, 400);
  }

  //error message in development mode
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      error: err,
      message: error.message,
      stack: err?.stack,
    });
  }

  //error message in production mode
  if(process.env.NODE_ENV === "PRODUCTION"){
    res.status(error.statusCode).json({
        message: error.message,
    })
  }

};
