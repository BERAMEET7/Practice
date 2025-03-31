const mongoose = require("mongoose");

const errorHandler = (err,req,res,next)=>{
    let statusCode = res.statusCode ===200 ? 500 :res.statusCode;
    let message = err.message || "Internal Server Error";

     // Handle Mongoose validation errors
     if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors).map((error) => error.message).join(", ");
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
    }

    // Handle Mongoose cast errors (e.g., invalid ObjectId)
    if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

     // Handle Express route not found
     if (err.name === "NotFound") {
        statusCode = 404;
        message = "Resource not found";
    }

    // Handle unauthorized access
    if (err.name === "UnauthorizedError") {
        statusCode = 401;
        message = "Unauthorized access";
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}

module.exports = errorHandler;