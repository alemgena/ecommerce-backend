const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    name: Joi.string().min(4).required().messages({
      "string.base": "product name must be a string",
      "string.empty": "product name cannot be empty field",
      "string.min": "product name must be longer than 4 characters",
      "any.required": "product name is a required field",
    }),
    otherOptions: Joi.object().messages({
      "object.base": "otherOptions must be an object",
      "object.empty": "otherOptions cannot be an empty object",
      "object.unknown": "otherOptions contains unknown keys",
      "object.min": "otherOptions must contain at least one key-value pair",
    }),
    location: Joi.string().required().messages({
      "string.base": "location must be a string",
      "string.empty": "location cannot be empty field",
      "any.required": "location is a required field",
    }),
    region: Joi.string().required().messages({
      "string.base": " region must be a string",
      "string.empty": "region cannot be empty field",
      "any.required": "region is a required field",
    }),
    description: Joi.string().required().min(4).messages({
      "string.base": "description must be a string",
      "string.empty": "description cannot be an empty field",
      "string.min": "description must be longer than 4 characters",
      "any.required": "description is a required field",
    }),
    subcategory: Joi.string().required().messages({
      "string.base": "subcategory must be a string",
      "string.empty": "subcategory cannot be an empty field",
      "any.required": "subcategory is a required field",
    }),
    price: Joi.number().required().messages({
      "string.base": "price must be a number",
      "string.empty": "price cannot be an empty field",
      "any.required": "price is a required field",
    }),
    imagesURL: Joi.array().items(Joi.string().required()).messages({
      "string.base": "imageURL must an array fo strings",
      "string.empty": "imageURL cannot be an empty field",
      "any.required": "imageURL is a required field",
    }),
    options: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required().messages({
          "string.base": "option must be a string",
          "string.empty": "option can not be empty",
          "any.required": "option are required",
        }),
        values: Joi.array().items(
          Joi.string().messages({
            "string.base": "option values must be a string",
            "any.required": "option values are required",
          })
        ),
        suboption: Joi.boolean().default(false).messages({
          "string.base": "suboption value must be a boolean",
        }),
        value: Joi.string().messages({
          "string.base": "value must be a string",
          "string.empty": "value cannot be an empty field",
        }),
      })
    ),
  }),
};
const update = {
  body: Joi.object().keys({
    name: Joi.string().min(4).messages({
      "string.base": "product name must be a string",
      "string.empty": "product name cannot be empty field",
      "string.min": "product name must be longer than 4 characters",
    }),
    location: Joi.string().messages({
      "string.base": "location must be a string",
      "string.empty": "location cannot be empty field",
    }),
    imagesURL: Joi.array().items(Joi.string()).messages({
      "string.base": "imageURL must an array fo strings",
    }),
    region: Joi.string().messages({
      "string.base": " region must be a string",
      "string.empty": "region cannot be empty field",
    }),
    description: Joi.string().min(4).messages({
      "string.base": "description must be a string",
      "string.empty": "description cannot be an empty field",
      "string.min": "description must be longer than 4 characters",
    }),
    subcategory: Joi.string().messages({
      "string.base": "subcategory must be a string",
      "string.empty": "subcategory cannot be an empty field",
    }),
    price: Joi.number().required().messages({
      "string.base": "price must be a number",
      "string.empty": "price cannot be an empty field",
      "any.required": "price is a required field",
    }),
    options: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required().messages({
          "string.base": "option must be a string",
          "string.empty": "option can not be empty",
          "any.required": "option are required",
        }),
        values: Joi.array().items(
          Joi.string().messages({
            "string.base": "option values must be a string",
            "any.required": "option values are required",
          })
        ),
        suboption: Joi.boolean().default(false).messages({
          "string.base": "suboption value must be a boolean",
        }),
        value: Joi.string().messages({
          "string.base": "value must be a string",
          "string.empty": "value cannot be an empty field",
        }),
      })
    ),
  }),
};

module.exports = {
  update,
  add,
};
