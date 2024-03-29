const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth");
const authController = require("../../controllers/auth");
const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/refresh", validate(authValidation.refresh), authController.refresh);

router.patch("/verify", authController.emailVerification);
router.patch("/forgetPassword",validate(authValidation.forgetPassword), authController.userForgetPassword)
router.patch('/refreshToken', validate(authValidation.refreshToken),authController.refreshToken)
module.exports = router;
