const Joi = require("joi");
const ObjectID = require("mongodb").ObjectId;
const add = {
  body: Joi.object().keys({
    message: Joi.string().required().messages({
      "string.empty": "message cannot be empty field",
    }),
    url: Joi.string().min(4).messages({
      "string.base": "url must be a string",
      "string.empty": "url cannot be empty field",
    }),
    to: Joi.string().required().messages({
      "string.empty": "to cannot be empty field",
    }),
    product: Joi.string().required().messages({
      "string.empty": "product cannot be empty field",
    }),

    roomId: Joi.number().required().messages({
      "string.base": "roomId must be a number",
      "string.empty": "roomId cannot be an empty field",
    }),
  }),
};
const get = {
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helper) => {
        if (!ObjectID.isValid(value)) {
          return helper.message("product id is not valid");
        } else {
          return value;
        }
      })
      .messages({
        "any.required": "product id is a required field",
      }),
  }),
};
const getByRoomId = {
    params: Joi.object().keys({
        roomId: Joi.number().required().messages({
            "string.base": "roomId must be a number",
            "string.empty": "roomId cannot be an empty field",
            "any.required": "roomId is a required field",
          }),
    }),
  };

module.exports = { add, get,getByRoomId };
