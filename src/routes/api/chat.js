const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const chatController = require("../../controllers/chat");

const chatValidation = require("../../validations/chat");
const router = express.Router();
router.post("",validate(chatValidation.add),auth(), chatController.createChat);
router.get("",auth(), chatController.get);
router.delete("/:id",auth(),chatController.delete);
module.exports = router;
