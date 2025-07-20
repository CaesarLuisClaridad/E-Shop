// middleware/errors.js
export default (err, req, res, next) => {
    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error"
    };

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};
