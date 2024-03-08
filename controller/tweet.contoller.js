const tweetActions = require("../database/tweet-actions");
const userActions = require("../database/user-actions");
const Like = require("../model/Like");
const Retweet = require("../model/Retweet");
const Tweet = require("../model/Tweet");
const CustomError = require("../utils/custom-error");

const tweetController = {
    newTweet: async (req, res) => {
        const content = req.body.content;
        const user = req.userData._id;
        const media = req.body.media;
        const replied = req.params?.tweetId;

        if (replied) {
            const tweet = await tweetActions.getTweet({ _id: replied });
            tweet.replyCount = (await Tweet.countDocuments({ replied: tweet._id })) + 1;
            await tweet.save();
        }

        const newTweet = await tweetActions.addTweet({
            user,
            content,
            media,
            replied,
        });

        res.json({
            success: true,
            message: "Tweet has been created",
            data: newTweet,
        });
    },

    getTweet: async (req, res) => {
        const tweet = await tweetActions.getTweet({ _id: req.params.tweetId });
        res.json({
            success: true,
            message: "Tweet fetched successfully",
            data: tweet,
        });
    },

    getTweetOfUser: async (req, res) => {
        const { username } = req.params;
        const userData = await userActions.getUserByUsername(username);
        const tweets = await tweetActions.tweetByUserId(userData._id, req.query);
        res.json({
            success: true,
            message: `tweets by ${username} brought successfully`,
            data: tweets,
        });
    },

    likeTweet: async (req, res) => {
        const tweet = await tweetActions.getTweet({ _id: req.params.tweetId });
        const alreadyLiked = await Like.findOne({
            user: req.userData._id,
            tweet: tweet._id,
        });
        let message;
        if (!alreadyLiked) {
            await Like.create({ user: req.userData._id, tweet: tweet._id });
            message = "Tweet Liked";
        } else {
            await alreadyLiked.deleteOne();
            message = "Tweet Unliked";
        }
        const totalLikes = await Like.countDocuments({ tweet: tweet._id });
        tweet.likeCount = totalLikes;
        const newTweet = await tweet.save();
        res.json({
            success: true,
            message: message,
            data: newTweet,
        });
    },

    getReplies: async (req, res) => {
        const replies = await tweetActions.getTweets({
            replied: req.params.tweetId,
        });
        res.json({
            success: true,
            message: "replies brought successfully",
            data: replies,
        });
    },

    makeRetweet: async (req, res) => {
        const tweet = await tweetActions.getTweet({ _id: req.params.tweetId });
        let retweet = await Retweet.findOne({
            user: req.userData._id,
            tweet: tweet._id,
        }).populate([
            {
                path: "tweet",
                populate: { path: "user", select: "username firstName _id" },
            },
            { path: "user", select: "username firstName _id" },
        ]);
        let message;
        if (retweet) {
            await retweet.deleteOne();
            message = "Retweet deleted";
        } else {
            retweet = await Retweet.create({
                user: req.userData._id,
                tweet: tweet._id,
            });
            await retweet.populate([
                {
                    path: "tweet",
                    populate: { path: "user", select: "username firstName _id" },
                },
                { path: "user", select: "username firstName _id" },
            ]);
            message = "Retweeted Successfully";
        }

        res.json({
            success: true,
            message: message,
            data: retweet,
        });
    },

    deleteTweet: async (req, res) => { 
        const { tweetId } = req.params;
        const userId = req.userData._id;
        const tweet = await tweetActions.getTweet({ _id: tweetId, user: userId });
        const replies = await tweetActions.getTweets({ replied: tweet._id });
        for (const reply of replies) {
            await reply.deleteOne();
        }
        if (tweet.replied) {
            const masterTweet = await tweetActions.getTweet({ _id: tweet.replied });
            await tweet.deleteOne();
            masterTweet.replyCount = await Tweet.countDocuments({ replied: masterTweet._id });
            await masterTweet.save();
        } else {
            await tweet.deleteOne();
        }
        res.json({
            success: true,
            message: "Tweet has been deleted",
        });
    },
};

module.exports = tweetController;
