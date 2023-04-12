const Joi = require("joi");

const add = {
    body: Joi.object().keys({
        name: Joi.string().min(4).required().messages({
          "string.base": "name must be a string",
          "string.empty": "name cannot be empty field",
          "string.min": "name must be longer than 4 characters",
          "any.required": "name is a required field",
        }),
    logo: Joi.string().required().messages({
      "string.base": "logo must be a string",
      "string.empty": "logo cannot be an empty field",
      "any.required": "logo is a required field",
    }),
    address: Joi.string().required().messages({
      "string.base": "address must be a string",
      "string.empty": "address cannot be an empty field",
      "any.required": "address is a required field",
    }),

    link: Joi.string().required().messages({
        "string.base": "link must be a string",
        "string.empty": "link cannot be an empty field",
        "any.required": "link is a required field",
      }),
      phone_number: Joi.string().required().messages({
        "string.empty": "phone number cannot be an empty field",
        "any.required": "phone number is a required field",
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
      logo: Joi.string().messages({
        "string.base": "logo must be a string",
        "string.empty": "logo cannot be an empty field",
   
      }),
      address: Joi.string().messages({
        "string.base": "address must be a string",
        "string.empty": "address cannot be an empty field",
      }),
      link: Joi.string().messages({
        "string.base": "link must be a string",
        "string.empty": "link cannot be an empty field",
      }),
      phone_number: Joi.string().messages({
        "string.empty": "phone number cannot be an empty field",
      }),
    }),
  };
module.exports = {
    add,
    update
  };