const express = require("express");
const validate = require("../../middlewares/validate");
const spamValidation = require("../../validations/spam");
const spamController = require("../../controllers/spam");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post("", auth(), validate(spamValidation.add), spamController.add);

module.exports = router;
