const Joi = require("joi");
const ObjectID = require("mongodb").ObjectId;

const add = {
  body: Joi.object().keys({
    product: Joi.string()
      .min(4)
      .required()
      .custom((value, helper) => {
        if (!ObjectID.isValid(value)) {
          return helper.message("product id is not valid");
        } else {
          return value;
        }
      })
      .messages({
        "string.base": "product must be a string",
        "string.empty": "product cannot be empty field",
        "any.required": "product is a required field",
      }),
  }),
};

module.exports = { add };
