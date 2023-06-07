const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    fileUrl: Joi.string().required().messages({
      "string.base": "file url name must be a string",
      "string.empty": "file url cannot be empty field",
      "any.required": "file url is a required field",
    }),
    type: Joi.string().required().messages({
      "string.base": "type must be a string",
      "string.empty": "type cannot be empty field",
      "any.required": "type is a required field",
    })
  }),
};
const update = {
    body: Joi.object().keys({
        fileUrl: Joi.string().messages({
          "string.base": "file url name must be a string",
          "string.empty": "file url cannot be empty field",
        }),
        type: Joi.string().messages({
          "string.base": "type must be a string",
          "string.empty": "type cannot be empty field",
        })
      }),
};

module.exports = {
  update,
  add,
};
