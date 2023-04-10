const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    name: Joi.string().min(4).required().messages({
      "string.base": "name must be a string",
      "string.empty": "name cannot be empty field",
      "string.min": "name must be longer than 4 characters",
      "any.required": "name is a required field",
    }),
    description: Joi.string().required().min(4).messages({
      "string.base": "description must be a string",
      "string.empty": "description cannot be an empty field",
      "string.min": "description must be longer than 4 characters",
      "any.required": "description is a required field",
    }),
    category: Joi.string().required().messages({
      "string.base": "category must be a string",
      "string.empty": "category cannot be an empty field",
      "any.required": "category is a required field",
    }),
    imageURL: Joi.array().items(Joi.string()).messages({
      "string.base": "imageURL must an array fo strings",
    }),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().min(4).messages({
      "string.base": "name must be a string",
      "string.empty": "name cannot be empty field",
      "string.min": "name must be longer than 4 characters",
    }),
    description: Joi.string().min(4).messages({
      "string.base": "description must be a string",
      "string.empty": "description cannot be an empty field",
      "string.min": "description must be longer than 4 characters",
    }),
    category: Joi.string().messages({
      "string.base": "category must be a string",
      "string.empty": "category cannot be an empty field",
    }),
    imageURL: Joi.array().items(Joi.string()).messages({
      "string.base": "imageURL must an array fo strings",
    }),
  }),
};

module.exports = {
  add,
  update,
};
