const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    values: Joi.array().required().min(1).items(Joi.string()).messages({
      "string.base": "values must be a string",
      "string.empty": "value is not allowed to be empty",
      "string.min": "values must contain at least 1 items",
      "any.required": "values are a required field",
    }),
  }),
  params: Joi.object().keys({
    id: Joi.string().required().messages({
      "any.required": "option id is a required field",
    }),
  }),
};

const addSubOptions = {
  body: Joi.object().keys({
    option: Joi.string().required().messages({
      "string.base": "option must be a string",
      "string.empty": "option cannot be an empty field",
      "any.required": "option is a required field",
    }),
    values: Joi.array().required().min(1).items(Joi.string()).messages({
      "string.base": "options must be a string",
      "string.empty": "option is not allowed to be empty",
      "string.min": "options must contain at least 1 items",
      "any.required": "options are a required field",
    }),
  }),

  params: Joi.object().keys({
    id: Joi.string().required().messages({
      "any.required": "value id is a required field",
    }),
  }),
};

const update = {
  body: Joi.object().keys({
    value: Joi.string().messages({
      "string.base": "value must be a string",
      "string.empty": "value cannot be empty field",
    }),
    option: Joi.string().messages({
      "string.base": "option must be a string",
      "string.empty": "option cannot be empty field",
    }),
  }),
};
module.exports = {
  add,
  update,
  addSubOptions,
};
