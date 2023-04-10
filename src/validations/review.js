const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    productId: Joi.string().required().messages({
      "any.required": "Product ID is required",
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      "any.required": "Rating is required",
      "string.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot be greater than 5",
    }),
    review: Joi.string().required().messages({
      "any.required": "Review is required",
      "string.base": "Review must be a string",
      "string.empty": "Review cannot be an empty field",
    }),
  }),
};

const update = {
  body: Joi.object().keys({
    rating: Joi.number().min(1).max(5).messages({
      "any.required": "Rating is required",
      "string.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot be greater than 5",
    }),
    review: Joi.string().messages({
      "any.required": "Review is required",
      "string.base": "Review must be a string",
      "string.empty": "Review cannot be an empty field",
    }),
  }),
};

module.exports = {
  add,
  update,
};
