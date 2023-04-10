const express = require("express");
const validate = require("../../middlewares/validate");
const advertisement = require("../../controllers/houseAdvertisement");
const auth = require("../../middlewares/auth");
const advertisementValidation=require("../../validations/housAdvertisement");
const router = express.Router();
router.post("", auth(), validate(advertisementValidation.add), advertisement.add);

router.delete("/:id", auth(), advertisement.delete);

router.patch(
  "/:id",
  auth(),
  validate(advertisementValidation.update),
  advertisement.update
);
router.get("/:id", advertisement.get);
router.get("", advertisement.list);

module.exports = router;

