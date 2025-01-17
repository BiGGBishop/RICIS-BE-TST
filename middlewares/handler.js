const AdminRepo = require("../repositories/adminRepo");

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
      console.log(error)
       
      next(error);
    }
  };
};


const authorize = (roles) => {
  return async (req, res, next) => {
    const adminExist = await AdminRepo.findAdminUser({ id: req.user?.id });

    if (!adminExist) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    const role = await AdminRepo.findRole({ id: adminExist?.userroleId });

    if (!roles.includes(role?.name)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: false,
        message: "Access denied, insufficient permissions",
      });
    }
    next();
  };
};

module.exports = { errorHandler, notFound, asyncHandler,authorize};
