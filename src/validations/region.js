const Joi = require("joi");

const add = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.base": "region name must be a string",
      "string.empty": "region name cannot be empty field",
      "any.required": "region name is a required field",
    }),
    subCitys: Joi.array().items(
      Joi.string().required().messages({
          "string.base": "subCitys must be a string",
          "string.empty": "subCitys can not be empty",
          "any.required": "subCitys are required",
        }),
    ),
  }),
};
const update = {
    body: Joi.object().keys({
      name: Joi.string().messages({
        "string.base": "region name must be a string",
        "string.empty": "region name cannot be empty field",
       
      }),
      subCitys: Joi.array().items(
        Joi.string().messages({
            "string.base": "subCitys must be a string",
            "string.empty": "subCitys can not be empty",
           
          }),
      ),
    }),
  };
  


module.exports = {
update,
  add,
};
