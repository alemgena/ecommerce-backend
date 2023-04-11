const express = require("express");
const auth = require("../../middlewares/auth");
const optionValuesController = require("../../controllers/optionValues");
const optionValuesSubOptionsController = require("../../controllers/valueSubOptions");
const validate = require("../../middlewares/validate");
const optionValueValidation = require("../../validations/optionValue");
const router = express.Router();

router.delete(
  "/:id",
  auth(),
  validate(optionValueValidation.update),
  optionValuesController.delete
);
router.patch(
  "/:id",
  auth(),
  validate(optionValueValidation.update),
  optionValuesController.update
);

router.post(
  "/:id/suboptions",
  auth(),
  validate(optionValueValidation.addSubOptions),
  optionValuesSubOptionsController.add
);

router.get(
  "/:id/options/:option",
  optionValuesSubOptionsController.getSubOptions
);
module.exports = router;
