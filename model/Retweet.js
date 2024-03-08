const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Retweet = mongoose.model(
    "Retweet",
    new mongoose.Schema({
        user: {
            type: ObjectId,
            ref: "user",
            required: true,
        },
        tweet: {
            type: ObjectId,
            ref: "Tweet",
            required: true,
        },
    })
);

module.exports = Retweet;
