const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    options: Joi.array().items({
      option: Joi.string().required().messages({
        "string.base": "variant option name must be a string",
        "string.empty": "variant option name cannot be empty field",
        "any.required": "variant option name is a required field",
      }),
      value: Joi.string().required().messages({
        "string.base": "variant option value must be a string",
        "string.empty": "variant option value cannot be empty field",
        "any.required": "variant option value is a required field",
      }),
    }),
  }),
  params: Joi.object().keys({
    id: Joi.string().required().messages({
      "any.required": "product id is a required field",
    }),
  }),
};

const update = {
  body: Joi.array().items({
    option: Joi.string().required().messages({
      "string.base": "variant option name must be a string",
      "string.empty": "variant option name cannot be empty field",
      "any.required": "variant option name is a required field",
    }),
    value: Joi.string().required().messages({
      "string.base": "variant option value must be a string",
      "string.empty": "variant option value cannot be empty field",
      "any.required": "variant option value is a required field",
    }),
  }),
};
module.exports = {
  add,
  update,
};
