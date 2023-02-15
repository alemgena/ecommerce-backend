const express = require("express");
const newsLetterController = require("../../controllers/newsLetter");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post(
  "",
  auth(),
  newsLetterController.add
);

module.exports = router;
