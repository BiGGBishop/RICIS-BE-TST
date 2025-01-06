const Joi = require("joi");
const STATUSCODE = require("../utils/statusCodes");
const { formatResult } = require("../utils/formatResult");

exports.authValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // googleToken: Joi.string(),
    // facebookToken: Joi.string(),
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};

exports.verifyOtpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    // googleToken: Joi.string(),
    // facebookToken: Joi.string(),
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};

exports.getOtpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    // otp: Joi.string().required(),
    // googleToken: Joi.string(),
    // facebookToken: Joi.string(),
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};

exports.userSignUpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company_name: Joi.string().required(),
    company_location: Joi.string().required(),
    // company_role: Joi.string().required(),
    company_email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone_number: Joi.string().required(),
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};



exports.classificationValidation = (req, res, next) => {
  const schema = Joi.object({
    classification_name: Joi.string().required(),
    form_type: Joi.string().required(),
    is_incidental: Joi.boolean().required(),
    form_type: Joi.string().required(),
    classification_number: Joi.number().integer().required(),
    category: Joi.number().integer().required(),  // Corrected to number().integer()
    sub_category: Joi.number().integer().required(),  // Corrected to number().integer()
    fees: Joi.array().required(),  // Corrected to number().integer()
    // incidental_fee: Joi.number().integer().required(),  // Corrected to number().integer()  
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};




exports.appValidation = (req, res, next) => {
  const schema = Joi.object({
    save_as_draft: Joi.boolean().required(),
    // application_category: Joi.string().required(),  // Corrected to number().integer()
    // categoryId: Joi.number().integer().required(),  // Corrected to number().integer()
    // subcategoryId: Joi.number().integer().required(),  // Corrected to number().integer()
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};

exports.feeValidation = (req, res, next) => {
  const schema = Joi.object({
    fee_type: Joi.string().required(),
    application_category: Joi.array().optional(),
    account_type:  Joi.string().required(),
    application_type: Joi.array().optional(),  
  });

  const validateOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const result = formatResult(schema.validate(req.body, validateOptions));
  // req.body = result

  if (result.error)
    return res.status(STATUSCODE.BAD_REQUEST).json({
      error: {
        message: result.message,
      },
    });
  next();
};
