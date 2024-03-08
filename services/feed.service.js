const Tweet = require("../model/Tweet");
const Follow = require("../model/Follow");

const getUserSpecificFeed = async (userId) => {
    const following = await Follow.find({ follower: userId });
    let allTweets = [];
    for (const follow of following) {
        const tweets = await Tweet.find({ user: follow.following._id }).sort("_id").limit(5).populate({ path: "user", select: "username firstName" });
        allTweets.push(...tweets);
    }
    if (allTweets.length < 1) {
        return await getHotPost();
    }

    allTweets = allTweets.map((tweet) => {
        tweet = tweet.toObject();
        tweet.score = tweet.likeCount + tweet.replyCount * 2;
        return tweet;
    });
    allTweets.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        } else {
            if (a._id.getTimestamp() > b._id.getTimestamp()) {
                return -1;
            } else if (a._id.getTimestamp() < b._id.getTimestamp()) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    return allTweets;
};

const getHotPost = async () => {
    let tweets = await Tweet.find({ user: follow.following._id })
        .sort("-_id -likeCount")
        .limit(20)
        .populate({ path: "user", select: "username firstName" });
    tweets = tweets.map((tweet) => {
        tweet = tweet.toObject();
        tweet.score = tweet.likeCount + tweet.replyCount * 2;
        return tweet;
    });
    tweets.sort((a, b) => {
        return b.score - a.score;
    });

    return tweets;
};

module.exports = { getUserSpecificFeed, getHotPost };
