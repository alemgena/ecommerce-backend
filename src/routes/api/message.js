const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const messageController = require("../../controllers/message");

const messageValidation = require("../../validations/message");
const router = express.Router();
router.post("",validate(messageValidation.add),auth(), messageController.add);
router.get("/:chatId", messageController.get)
router.delete("/:id",auth(),messageController.delete);
module.exports = router;
