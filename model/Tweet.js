const mongoose = require("mongoose");

const Tweet = mongoose.model(
    "Tweet",
    new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            likeCount: {
                type: Number,
                default: 0,
            },
            replyCount: {
                type: Number,
                default: 0,
            },
            replied: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
                default: null,
            },
            media: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "upload",
                default: null,
            },
        },
        {
            timestamps: true,
        }
    )
);

module.exports = Tweet;
