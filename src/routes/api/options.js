const express = require("express");
const auth = require("../../middlewares/auth");
const productOptionController = require("../../controllers/productOptions");
const optionValuesController = require("../../controllers/optionValues");
const router = express.Router();
const validate = require("../../middlewares/validate");
const optionValidation = require("../../validations/productOptions");
const optionValueValidation = require("../../validations/optionValue");

router.delete("/:id", auth(), productOptionController.delete);
router.patch(
  "/:id",
  auth(),
  validate(optionValidation.update),
  productOptionController.update
);
router.post(
  "/:id/values",
  auth(),
  validate(optionValueValidation.add),
  optionValuesController.add
);

router.post(
  "/:id/suboptions",
  auth(),
  // validate(optionValueValidation.add),
  productOptionController.addSubOption
);

module.exports = router;
