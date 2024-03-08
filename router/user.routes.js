const express = require("express");
const userController = require("../controller/user.controller");
const userAuthorize = require("../middleware/user-authorization");
const validator = require("../middleware/validator");
const validationSchemas = require("../utils/validation-schemas");
const tweetController = require("../controller/tweet.contoller");
const router = express.Router();

router.get("/:username", userController.getUserData);
router.put("/", [userAuthorize, validator(validationSchemas.userUpdate)], userController.updateUserData);
router.get("/:username/tweets", tweetController.getTweetOfUser);
router.post("/:username/follow", [userAuthorize], userController.followUser);
router.get("/:username/followers", userController.getFollowers);
router.get("/:username/following", userController.getFollowing);

module.exports = router;
