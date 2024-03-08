const { options } = require("joi");
const Tweet = require("../model/Tweet");
const CustomError = require("../utils/custom-error");
const { makeSearchRegex } = require("../utils/strings");

const addTweet = async (tweet) => {
    const createdTweet = await Tweet.create(tweet);
    return createdTweet;
};

const getTweet = async (filter) => {
    const tweet = await Tweet.findOne(filter).populate({
        path: "user",
        select: "username firstName",
    });

    if (!tweet) {
        throw new CustomError(404, "tweet not found");
    }
    return tweet;
};

const getTweets = async (filter) => {
    const tweet = await Tweet.find(filter).populate({
        path: "user",
        select: "username firstName",
    });
    if (!tweet) {
        throw new CustomError(404, "Tweet not Found");
    }

    return tweet;
};

const tweetByUserId = async (userId, params) => {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 20;

    const filter = { user: userId };
    const offset = (page - 1) * limit;
    const tweetCount = await Tweet.countDocuments(filter);
    const tweets = await Tweet.find(filter).skip(offset).limit(limit);

    if (!tweets) {
        throw new CustomError(500, "server ran into a problem");
    }
    return {
        tweetCount: tweetCount,
        page: page,
        limit: limit,
        tweets: tweets,
    };
};

const searchTweets = async (searchTerm, options) => {
    searchTerm = makeSearchRegex(searchTerm);
    const filter = { content: { $regex: searchTerm } };

    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 20;

    const offset = (page - 1) * limit;
    const resultCount = await Tweet.countDocuments(filter);
    const results = await Tweet.find(filter).skip(offset).limit(limit);
    return {
        resultCount: resultCount,
        page: page,
        limit: limit,
        results: results,
    };
};

module.exports = {
    addTweet,
    getTweet,
    tweetByUserId,
    getTweets,
    searchTweets,
};
