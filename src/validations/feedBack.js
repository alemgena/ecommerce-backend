const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    message: Joi.string().min(4).required().messages({
      "string.base": "message must be a string",
      "string.empty": "message cannot be empty field",
      "any.required": "message is a required field",
      "string.min": "message must be longer than 4 characters",
    }),
    userId: Joi.string().required().messages({
        "string.base": "message must be a string",
        "string.empty": "message cannot be empty field",
        "any.required": "message is a required field",
     
      }),
  }),
};
module.exports = {
    add,
  };