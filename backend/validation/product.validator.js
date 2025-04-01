const Joi = require("joi");
const mongoose = require("mongoose");

const productValidation = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    type: Joi.string().valid("category", "subcategory").required(),
    price: Joi.number().positive().required(),
    seller: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }).required(),
    categoryid: Joi.string().custom((value, helpers) => {
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }).optional(),
});

module.exports = productValidation;