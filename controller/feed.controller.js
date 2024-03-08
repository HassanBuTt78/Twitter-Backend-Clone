const feedService = require("../services/feed.service");

const feedController = {
    getFeed: async (req, res) => {
        const userId = req.userData._id;
        const feed = await feedService.getUserSpecificFeed(userId);
        res.json({
            success: true,
            message: "feed generated successfully",
            data: feed,
        });
    },
};

module.exports = feedController;
