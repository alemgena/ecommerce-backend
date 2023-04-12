const express = require("express");
const validate = require("../../middlewares/validate");
const favouriteValidation = require("../../validations/favourite");
const favouriteController = require("../../controllers/favourite");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post(
  "",
  auth(),
  validate(favouriteValidation.add),
  favouriteController.add
);
router.get(
  "", auth(),
  favouriteController.get
);
module.exports = router;
