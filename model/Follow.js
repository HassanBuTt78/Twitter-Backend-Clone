const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Follow = mongoose.model(
    "Follow",
    new mongoose.Schema({
        follower: {
            type: ObjectId,
            ref: "user",
            required: true,
        },
        following: {
            type: ObjectId,
            ref: "user",
            required: true,
        },
    })
);

module.exports = Follow;
