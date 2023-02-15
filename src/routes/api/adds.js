const express = require("express");
const validate = require("../../middlewares/validate");
const addsValidation = require("../../validations/adds");
const addsController = require("../../controllers/adds");
const passport = require("passport");
const router = express.Router();
router.post("", validate(addsValidation.add), addsController.add);
module.exports=router