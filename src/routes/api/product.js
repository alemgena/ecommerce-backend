const express = require("express");
const validate = require("../../middlewares/validate");
const productValidation = require("../../validations/product");
const productVariantValidation = require("../../validations/productVariant");
const productController = require("../../controllers/product");
const productVariantController = require("../../controllers/productVariant");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("", auth(), validate(productValidation.add), productController.add);

 router.get("/list", productController.list);
router.get("/:id", productController.view);
router.get("", productController.queryProducts);
router.patch(
  "/:id",
  auth(),
  validate(productValidation.update),
  productController.update
);
router.post("/uploadImages/:id", productController.uploadProductImages);
router.post("/updateImages/:id", productController.updateProductImages);
router.delete("/:id", auth(), productController.delete);
router.get("/byName/:name", productController.getByName);
router.post(
  "/:id/variants",
  validate(productVariantValidation.add),
  auth(),
  productVariantController.add
);
module.exports = router;
