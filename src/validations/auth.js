const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    first_name: Joi.string().min(4).required().messages({
      "string.base": "first name must be a string",
      "string.empty": "first name cannot be empty field",
      "string.min": "first name must be longer than 4 characters",
      "any.required": "first name is a required field",
    }),
    last_name: Joi.string().required().min(4).messages({
      "string.base": "last name must be a string",
      "string.empty": "last name cannot be an empty field",
      "string.min": "last name must be longer than 4 characters",
      "any.required": "last name is a required field",
    }),
    phone: Joi.string().required().min(4).messages({
      "string.base": "phone must be a string",
      "string.empty": " phone cannot be an empty field",
      "string.min": "phone must be longer than 4 characters",
      "any.required": "phone is a required field",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "email must be a string",
      "string.email": "must enter a valid email",
      "string.empty": "email is required",
      "any.required": "email is a required field",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "password must be a string",
      "string.empty": "password is required",
      "string.min": "The password must be at least 6 characters.",
      "any.required": "password is a required field",
    }),
  }),
};
const login = {
  body: Joi.object().keys({
    input: Joi.string().required().messages({
      "string.base": "input must be a string",
      "string.empty": "input is required",
      "any.required": "input is a required field",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "password must be a string",
      "string.empty": "password is required",
      "any.required": "password is a required field",
      "string.min": "password must be at least 6 characters.",
    }),
  }),
};
module.exports = {
  register,
  login,
};
