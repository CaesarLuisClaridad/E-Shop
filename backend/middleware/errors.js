// middleware/errors.js
export default (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

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
