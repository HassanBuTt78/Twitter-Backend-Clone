const express = require("express");
const userAuthorize = require("../middleware/user-authorization");
const feedController = require("../controller/feed.controller");
const router = express.Router();


router.get("/", [userAuthorize], feedController.getFeed);


module.exports = router;
