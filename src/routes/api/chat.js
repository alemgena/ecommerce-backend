const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const chatController = require("../../controllers/chat");

const chatValidation = require("../../validations/chat");
const router = express.Router();
router.post("", auth(), validate(chatValidation.add), chatController.add);
router.get("",auth(), chatController.get);
router.get("/list",auth(),chatController.list);
module.exports = router;
