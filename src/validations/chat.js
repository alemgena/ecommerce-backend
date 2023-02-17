const Joi = require("joi");

const add = {
    body: Joi.object().keys({
        message: Joi.string().required().messages({
            "string.empty": "message cannot be empty field",
        
        }),

        url: Joi.string().min(4).messages({
            "string.base": "url must be a string",
            "string.empty": "url cannot be empty field",
        }),
        to: Joi.string().required().messages({
            "string.empty": "to cannot be empty field",
        
        }),
        product: Joi.string().required().messages({
            "string.empty": "product cannot be empty field",
        
        }),
    }),
};

module.exports = {add};
