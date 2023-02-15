const express = require("express");
const validate = require("../../middlewares/validate");
const categoryValidation = require("../../validations/category");
const categoryController = require("../../controllers/category");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post(
  "",
  auth(),
  validate(categoryValidation.add),
  categoryController.add
);
router.get("", categoryController.list);

router.patch(
  "/:id",
  auth(),
  validate(categoryValidation.update),
  categoryController.update
);

router.delete("/:id", auth(), categoryController.delete);

router.get("/:id/subcategories", categoryController.listSubCategories);
module.exports = router;
