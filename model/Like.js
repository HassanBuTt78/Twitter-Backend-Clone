const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Like = mongoose.model(
    "Like",
    new mongoose.Schema({
        user: {
            type: ObjectId,
            ref: "user",
            required: true,
        },
        tweet: {
            type: ObjectId,
            ref: "tweet",
            required: true,
        },
    })
);

module.exports = Like;
