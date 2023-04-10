const Joi = require("joi");

const add = {
    body: Joi.object().keys({
        question: Joi.string().min(4).required().messages({
            "string.base": "question must be a string",
            "string.empty": "question cannot be empty field",
            "string.min": "question must be longer than 4 characters",
            "any.required": "question is a required field",
        }),
        answer: Joi.string().required().min(4).messages({
            "string.base": "answer must be a string",
            "string.empty": "answer cannot be an empty field",
            "string.min": "answer must be longer than 4 characters",
            "any.required": "answer is a required field",
        }),
        state: Joi.string().required().min(4).messages({
            "string.base": "state must be a string",
            "string.empty": "state cannot be an empty field",
            "string.min": "state must be longer than 4 characters",
            "any.required": "state is a required field",
        }),


    }),
};

module.exports = {
    add,
};
