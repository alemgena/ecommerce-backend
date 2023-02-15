const express = require("express");
const validate = require("../../middlewares/validate");
const advertisement = require("../../controllers/houseAdvertisement");
const auth = require("../../middlewares/auth");
const router = express.Router();
router.post("", auth(), advertisement.add);
module.exports = router;
