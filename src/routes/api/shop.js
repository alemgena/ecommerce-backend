const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const shopController = require("../../controllers/shop");
const shopValidation = require("../../validations/shop");

const router = express.Router();

router.post("", auth(), validate(shopValidation.add), shopController.add);

router.delete("/:id", auth(), shopController.delete);

router.patch(
  "/:id",
  auth(),
  validate(shopValidation.update),
  shopController.update
);
router.get("/:id", shopController.get);
router.get("", shopController.list);

module.exports = router;
