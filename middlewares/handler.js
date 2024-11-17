const notFound = (req, res) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  console.log({ error: error });
  res.status(404).json({
    status: "false",
    message: error.message,
  });
};

const errorHandler = (err, req, res) => {
  console.log({ res: res.statusCode });

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = "Internal Server Error";
  // console.log({ Error: err.message })

  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        // console.log({check:error.message})
      next(error);
    }
  };
};

module.exports = { errorHandler, notFound, asyncHandler };
