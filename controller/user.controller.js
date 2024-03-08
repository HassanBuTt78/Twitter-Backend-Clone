const db = require("../database/user-actions.js");
const Follow = require("../model/Follow.js");
const CustomError = require("../utils/custom-error.js");

const userController = {
    getUserData: async (req, res) => {
        const user = await db.getUserByUsername(req.params.username);
        res.json({
            success: true,
            message: "user data retrieved successfully",
            data: user,
        });
    },
    updateUserData: async (req, res) => {
        const update = req.body;
        const username = req.body?.username;
        if (username) {
            const accountOnUsername = await db.getUser({ username: username });
            if (accountOnUsername) {
                throw new CustomError(409, "username is already taken");
            }
        }

        const updatedData = await db.updateUser(req.userData._id, update);
        if (!updatedData) {
            const err = new CustomError(500, "Server ran into a Problem");
            throw err;
        }
        res.status(200).json({
            success: true,
            message: "updated the user",
            data: updatedData,
        });
    },
    followUser: async (req, res) => {
        const selfUserId = req.userData._id;
        if (req.userData.username === req.params.username) {
            throw new CustomError(403, "You can't Follow Yourself");
        }
        const targetUser = await db.getUserByUsername(req.params.username);
        const existingFollow = await Follow.findOne({
            follower: selfUserId,
            following: targetUser._id,
        });
        let message;
        if (existingFollow) {
            await existingFollow.deleteOne();
            message = `Unfollowed ${targetUser.username}`;
        } else {
            await Follow.create({
                follower: selfUserId,
                following: targetUser._id,
            });

            message = `Followed ${targetUser.username}`;
        }
        const totalFollowing = await Follow.countDocuments({
            follower: selfUserId,
        });
        const totalFollowers = await Follow.countDocuments({
            following: targetUser._id,
        });
        req.userData.followingCount = totalFollowing;
        targetUser.followerCount = totalFollowers;
        await targetUser.save();
        const newUserData = await req.userData.save();
        res.json({
            success: true,
            message: message,
            data: newUserData,
        });
    },
    getFollowers: async (req, res) => {
        const userData = await db.getUserByUsername(req.params.username);
        const followers = await Follow.find({
            following: userData._id,
        }).populate({ path: "follower", select: "username firstName _id" });
        const followerArray = followers.map((x) => x.follower);
        res.json({
            success: true,
            message: `Followers of ${userData.username} brought successfully`,
            data: followerArray,
        });
    },
    getFollowing: async (req, res) => {
        const userData = await db.getUserByUsername(req.params.username);
        const following = await Follow.find({
            follower: userData._id,
        }).populate({ path: "following", select: "username firstName _id" });
        const followingArray = following.map((x) => x.following);
        res.json({
            success: true,
            message: `Followers of ${userData.username} brought successfully`,
            data: followingArray,
        });
    },
};

module.exports = userController;
