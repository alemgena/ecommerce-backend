const Joi = require("joi");

const add = {
    body: Joi.object().keys({
        title: Joi.string().min(4).required().messages({
            "string.base": "title must be a string",
            "string.empty": "title cannot be empty field",
            "string.min": "title must be longer than 4 characters",
            "any.required": "title is a required field",
        }),
        description: Joi.string().required().min(4).messages({
            "string.base": "description must be a string",
            "string.empty": "description cannot be an empty field",
            "string.min": "description must be longer than 4 characters",
            "any.required": "description is a required field",
        }),
        status: Joi.string().messages({
            "string.base": "status must be a string"
        }),
        image: Joi.string().messages({
            "string.base": "click_action must be a string"
        }),


    }),
};

module.exports = {
    add,
};
