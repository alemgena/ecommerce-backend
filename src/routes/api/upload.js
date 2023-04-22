const express = require("express");
const uploadController = require("../../controllers/upload");
const router = express.Router();

router.post("/types/:type", uploadController.upload);

router.post("/type/:type", uploadController.singleImage);
router.post("/fileType/:type", uploadController.singleFile);
module.exports = router;
