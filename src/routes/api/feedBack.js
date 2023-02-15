const express = require("express");
const validate = require("../../middlewares/validate");
const feedBackValidation = require("../../validations/feedBack");
const feedBackController = require("../../controllers/feedBack");
const auth = require("../../middlewares/auth");
const router = express.Router();
router.post(
  "",
  auth(),
  validate(feedBackValidation.add),
  feedBackController.add
);

router.get("", feedBackController.list);
module.exports = router;
