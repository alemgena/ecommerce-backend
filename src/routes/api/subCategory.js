const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const subCategoryController = require("../../controllers/subCategory");
const productOptionController = require("../../controllers/productOptions");
const subCategoryValidation = require("../../validations/subCategory");
const optionValidation = require("../../validations/productOptions");

const router = express.Router();

router.post(
  "",
  auth(),
  validate(subCategoryValidation.add),
  subCategoryController.add
);

router.delete("/:id", auth(), subCategoryController.delete);

router.patch(
  "/:id",
  auth(),
  validate(subCategoryValidation.update),
  subCategoryController.update
);
router.get(
  "/:id", // auth(),
  subCategoryController.get
);

router.post(
  "/:id/options",
  auth(),
  validate(optionValidation.add),
  productOptionController.add
);
module.exports = router;
