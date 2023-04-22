const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const documentController = require("../../controllers/document");
const documentValidation = require("../../validations/document");

const router = express.Router();

router.post("", auth(), validate(documentValidation.add), documentController.add);

router.delete("/:id", auth(), documentController.delete);

router.patch(
  "/:id",
  auth(),
  validate(documentValidation.update),
  documentController.update
);
router.get("/:id", documentController.get);
router.get("", documentController.list);

module.exports = router;
