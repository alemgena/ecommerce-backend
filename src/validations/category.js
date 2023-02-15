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
        imageURL: Joi.string().required().min(1).messages({
            "string.base": "image must be a string",
            "string.empty": "image cannot be an empty field",
            "any.required": "image is a required field",
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
     
      imageURL: Joi.array().items(Joi.string()).messages({
        "string.base": "imageURL must an array fo strings",
      }),
    }),
  };
  

module.exports = {
    add,
};
