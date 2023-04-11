const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const reviewController = require("../../controllers/review");
const reviewValidation = require("../../validations/review");
const router = express.Router();
router.post("", auth(), validate(reviewValidation.add), reviewController.add);
router.patch(
  "/:id",
  auth(),
  validate(reviewValidation.update),
  reviewController.update
);
router.get("/:id", reviewController.get);
router.get("", reviewController.list);
router.delete("/:id", auth(), reviewController.delete);
module.exports = router;
