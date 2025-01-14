
const errorHandler = (err, req, res, next) => {
    // Log the error details (optional, for debugging)
    console.error(err.stack);

    // Default error response structure
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null; // For additional error details, if available

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        errors,
    });
};

module.exports = errorHandler;
