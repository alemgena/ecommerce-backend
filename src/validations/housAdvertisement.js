const Joi = require("joi");

const add = {
    body: Joi.object().keys({
        title: Joi.string().min(4).required().messages({
          "string.base": "title must be a string",
          "string.empty": "title cannot be empty field",
          "string.min": "title must be longer than 4 characters",
          "any.required": "title is a required field",
        }),
    photo: Joi.string().required().messages({
      "string.base": "photo must be a string",
      "string.empty": "photo cannot be an empty field",
      "any.required": "photo is a required field",
    }),
    description: Joi.string().required().min(4).messages({
      "string.base": "description must be a string",
      "string.empty": "description cannot be an empty field",
      "string.min": "description must be longer than 4 characters",
      "any.required": "description is a required field",
  }),

    link: Joi.string().required().messages({
        "string.base": "link must be a string",
        "string.empty": "link cannot be an empty field",
        "any.required": "link is a required field",
      }),
 
  }),
};
const update = {
    body: Joi.object().keys({
      title: Joi.string().min(4).messages({
        "string.base": "title must be a string",
        "string.empty": "title cannot be empty field",
        "string.min": "title must be longer than 4 characters",
      }),
      photo: Joi.string().messages({
        "string.base": "photo must be a string",
        "string.empty": "photo cannot be an empty field",
   
      }),
      link: Joi.string().messages({
        "string.base": "link must be a string",
        "string.empty": "link cannot be an empty field",
      }),
      description: Joi.string().required().min(4).messages({
        "string.base": "description must be a string",
        "string.empty": "description cannot be an empty field",
        "string.min": "description must be longer than 4 characters",
    }),
    }),
  };
module.exports = {
    add,
    update
  };