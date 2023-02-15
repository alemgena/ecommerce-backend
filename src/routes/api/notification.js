const express = require("express");
const validate = require("../../middlewares/validate");
const notificationValidation = require("../../validations/notification");
const notificationController = require("../../controllers/notification");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post(
  "",
  auth(),
  validate(notificationValidation.add),
  notificationController.add
);

router.get("", notificationController.list);

router.patch("/:id", auth(), notificationController.update);

router.delete("/:id", auth(), notificationController.delete);
module.exports = router;
