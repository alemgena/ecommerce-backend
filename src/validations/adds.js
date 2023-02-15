const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    imageUri: Joi.string().required().messages({
      "string.base": "image url must be a string",
      "string.empty": "image url cannot be empty field",
      "any.required": "image url is a required field",
    }),
    link: Joi.string().required().messages({
      "string.base": "link must be a string",
      "string.empty": "link cannot be an empty field",
      "any.required": "link is a required field",
    }),
 
  }),
};
module.exports = {
    add,
  };