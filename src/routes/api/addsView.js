const express = require("express");
const addViewController = require("../../controllers/addsView");
const router = express.Router();
router.post("",  addViewController.add);
router.get("/:addsId",  addViewController.countAddsView);
module.exports=router