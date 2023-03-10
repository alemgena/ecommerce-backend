const express = require("express");
const newsLetterController = require("../../controllers/newsLetter");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post("", auth(), newsLetterController.add);

router.get("", auth(), newsLetterController.list);
router.delete("/:id", auth(), newsLetterController.systemUnsubscribe);
router.delete("", auth(), newsLetterController.unsubscribe);
module.exports = router;
