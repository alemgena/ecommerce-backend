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
    status: Joi.string().required().messages({
      "string.base": "status must be a string",
      "any.required": "status is a required field",
    }),
    type: Joi.string().required().messages({
      "string.base": "type must be a string",
      "any.required": "type is a required field",
    }),
    image: Joi.string().messages({
      "string.base": "image must be a string",
    }),
    body: Joi.string().messages({
      "string.base": "body must be a string",
    }),
  }),
};

module.exports = {
  add,
};
