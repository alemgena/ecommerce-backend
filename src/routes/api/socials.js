const express = require("express");
const socialsController = require("../../controllers/social");

const router = express.Router();

router.get("/google", socialsController.google);
module.exports = router;
