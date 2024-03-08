const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");
const tweetController = require("../controller/tweet.contoller.js");
const userAuthorize = require("../middleware/user-authorization.js");

router.post("/", [userAuthorize, validator(validationSchemas.newTweet)], tweetController.newTweet);
router.get("/:tweetId", tweetController.getTweet);
router.post("/:tweetId/like", [userAuthorize], tweetController.likeTweet);
router.post("/:tweetId/reply", [userAuthorize, validator(validationSchemas.newTweet)], tweetController.newTweet);
router.get("/:tweetId/replies", tweetController.getReplies);
router.post("/:tweetId/retweet", [userAuthorize], tweetController.makeRetweet);
router.delete("/:tweetId", [userAuthorize], tweetController.deleteTweet )

module.exports = router;
