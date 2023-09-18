const Joi = require("joi");
const ObjectID = require("mongodb").ObjectId;
const add = {
    body: Joi.object().keys({
      userId: Joi.string()
        .min(4)
        .required()
        .custom((value, helper) => {
          if (!ObjectID.isValid(value)) {
            return helper.message("user  id is not valid");
          } else {
            return value;
          }
        })
        .messages({
          "string.base": "userId must be a string",
          "string.empty": "userId cannot be empty field",
          "any.required": "userId is a required field",
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
