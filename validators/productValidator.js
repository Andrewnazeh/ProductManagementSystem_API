const joi = require('joi');

exports.CreateProductSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    // imageUrl: joi.string().required(),
});

exports.UpdateProductSchema = joi.object({
    name: joi.string(),
    description: joi.string(),
    price: joi.number(),
    // imageUrl: joi.string(),
});