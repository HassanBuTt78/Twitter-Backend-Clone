const mongoose = require("mongoose");

const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            firstName: { type: String, required: true },
            lastName: { type: String, default: null },
            username: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            verified: { type: String, default: false },
            password: { type: String, required: true },
            followerCount: { type: Number, default: 0 },
            followingCount: { type: Number, default: 0 },
            profilePicture: { type: String, default: "https://i.ibb.co/f0FB5QJ/Twitter-new-2017-avatar-001.png" },
        },
        { versionKey: false }
    )
);
module.exports = {
    User,
};
