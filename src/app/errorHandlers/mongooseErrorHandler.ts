import httpStatus from "http-status";
import mongoose from "mongoose";

const mongooseErrorHandler = (
  mongooseError: mongoose.Error.ValidationError | mongoose.Error.CastError
) => {
  const statusCode = httpStatus.NOT_ACCEPTABLE;
  let errorSources;
  if (mongooseError instanceof mongoose.Error.CastError) {
    errorSources = [
      {
        path: mongooseError.path,
        message: mongooseError.message,
      },
    ];
    return {
      statusCode,
      message: "Mongoose Cast Error",
      errorSources,
    };
  } else if (mongooseError instanceof mongoose.Error.ValidationError) {
    const errorSources = Object.values(mongooseError.errors).map((error) => {
      return {
        path: error.path,
        message: error.message,
      };
    });
    return {
      statusCode,
      message: "Mongoose Validation Error",
      errorSources,
    };
  } else {
    return {
      statusCode,
      message: "Mongoose unknown Error",
      errorSources: [],
    };
  }
};

export default mongooseErrorHandler;
