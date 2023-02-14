const Joi = require("joi");

const add = {
  body: Joi.array()
    .required()
    .min(1)
    .items(
      Joi.object().keys({
        name: Joi.string().required().messages({
          "string.base": "name must be a string",
          "string.empty": "name can not be empty",
          "any.required": "name are required",
        }),
        input_type: Joi.string().required().messages({
          "string.base": "input_type must be a string",
          "string.empty": "input_type can not be empty",
          "any.required": "input_type are required",
        }),
      })
    ),

  params: Joi.object().keys({
    id: Joi.string().required().messages({
      "any.required": "subcategory id is a required field",
    }),
  }),
};

const addSubOption = {
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
      "any.required": "subcategory id is a required field",
    }),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().messages({
      "string.base": "name must be a string",
      "string.empty": "name cannot be empty field",
    }),
    subcategory: Joi.string().messages({
      "string.base": "subcategory must be a string",
      "string.empty": "subcategory cannot be empty field",
    }),
  }),
};
module.exports = {
  add,
  update,
};
