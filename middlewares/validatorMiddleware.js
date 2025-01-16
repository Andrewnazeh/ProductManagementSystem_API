const Joi = require('joi');
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        next(error);
        return;
    }

    next();
};

module.exports = validate;
