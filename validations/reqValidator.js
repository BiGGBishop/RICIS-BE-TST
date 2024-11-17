const Joi = require('joi'); // Ensure Joi is required

const validateReqBody = (schema) => async (req, res, next) => {
    try {
        const validateOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        // Promisify the validation call if validateAsync is not available
        const newReqBody = await new Promise((resolve, reject) => {
            Joi.validate(req.body, schema, validateOptions, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });

        req.body = newReqBody;
        next();
    } catch (error) {
        res
            .status(error.status || 400)
            .json({ success: false, message: error.message });
    }
};

module.exports = { validateReqBody };