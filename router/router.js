const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes.js");
const gallaryRouter = require("./uploads.routes.js");
const tweetRouter = require("./tweets.routes.js");
const userRouter = require("./user.routes.js");
const feedRouter = require("./feed.routes.js");
const searchRouter = require("./search.routes.js");

router.use("/auth", authRouter);
router.use("/uploads", gallaryRouter);
router.use("/tweets", tweetRouter);
router.use("/users", userRouter);
router.use("/feed", feedRouter);
router.use("/search", searchRouter);

module.exports = router;
