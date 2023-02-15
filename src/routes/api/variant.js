const express = require("express");
const validate = require("../../middlewares/validate");
const productVariantValidation = require("../../validations/productVariant");
const productVariantController = require("../../controllers/productVariant");
const Auth = require("../../middlewares/auth");

const router = express.Router();

router.delete("/:id", Auth(), productVariantController.delete);
router.patch(
  "/:id",
  Auth(),
  validate(productVariantValidation.update),
  productVariantController.update
);

module.exports = router;
