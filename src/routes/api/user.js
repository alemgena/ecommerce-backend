const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user");
const userController = require("../../controllers/user");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.patch(
  "/changePassword",
  auth(),
  validate(userValidation.changePassword),
  userController.changeUserPassword
);
router.patch(
  "/:id/activateAccount",
  auth(),
  userController.activateUserAccount
);

router.patch("/:id", auth(), userController.update);
router.get("/:id",auth(), userController.get)
router.get("",auth(),userController.list)
router.patch("/:id/suspendAccount", userController.suspendUserAccount);
module.exports = router;
