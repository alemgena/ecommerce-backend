const express = require("express");
const validate = require("../../middlewares/validate");
const faqValidation = require("../../validations/faq");
const faqController = require("../../controllers/faq");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post("", auth(), validate(faqValidation.add), faqController.add);

router.get("", faqController.list);

router.patch("/:id", auth(), faqController.update);

router.delete("/:id", auth(), faqController.delete);
module.exports = router;
