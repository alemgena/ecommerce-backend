const Joi = require("joi");
const ObjectID = require("mongodb").ObjectId;
const add = {
    body: Joi.object().keys({
        content: Joi.string().required().messages({
            "string.base": "content must be a string",
            "string.empty": "content cannot be empty field",
            "any.required": "content is a required field",
          }),
      chat: Joi.string()
        .min(4)
        .required()
        .custom((value, helper) => {
          if (!ObjectID.isValid(value)) {
            return helper.message("chat  id is not valid");
          } else {
            return value;
          }
        })
        .messages({
          "string.base": "chat id must be a string",
          "string.empty": "chat id cannot be empty field",
          "any.required": "chat id  is a required field",
        }),
    }),
  
};


module.exports = { add };
