const Joi = require("joi");
const changePassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().min(6).required().messages({
      "string.base": "new password must be a string",
      "string.empty": "new password is required",
      "any.required": "new password is a required field",
    }),
    oldPassword: Joi.string().min(6).required().messages({
      "string.base": "old password must be a string",
      "string.empty": "old password is required",
      "any.required": "old password is a required field",
    }),
  }),
};
module.exports = {
  changePassword
};
