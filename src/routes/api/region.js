const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const regionController = require("../../controllers/region");
const regionValidation = require("../../validations/region");

const router = express.Router();

router.post("", auth(), validate(regionValidation.add), regionController.add);
router.delete("/:id", auth(), regionController.delete);

router.patch(
  "/:id",
  auth(),
  validate(regionValidation.update),
  regionController.update
);
router.get("/:id", regionController.get);
router.get("", regionController.list);

module.exports = router;
