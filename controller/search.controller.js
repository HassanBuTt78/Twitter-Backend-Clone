const tweetActions = require("../database/tweet-actions");
const userActions = require("../database/user-actions");
const CustomError = require("../utils/custom-error");

const searchController = {
    searchUsers: async (req, res) => {
        const search = req.query?.search;
        if (!search) {
            throw new CustomError(400, "search term is required");
        }
        const searchResults = await userActions.searchUsers(search, req.query);
        res.json({
            success: true,
            message: "search performed successfully",
            data: searchResults,
        });
    },
    searchTweet: async (req, res) => {
        const search = req.query?.search;
        if (!search) {
            throw new CustomError(400, "search term is required");
        }
        const searchResults = await tweetActions.searchTweets(search, req.query);
        res.json({
            success: true,
            message: "search performed successfully",
            data: searchResults,
        });
    },
};

module.exports = searchController;
