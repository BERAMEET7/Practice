const Joi = require("joi");

const userValidation = Joi.object({
    name:Joi.string().alphanum().min(3).max(50).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,25}$')).required()
})

module.exports = userValidation;