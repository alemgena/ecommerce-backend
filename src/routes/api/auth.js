const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth");
const authController = require("../../controllers/auth");
const passport=require('passport');
const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.patch("/verify", authController.emailVerification);
router.patch("/forgetPassword",authController.userForgetPassword)
module.exports = router;
