const { User } = require("../model/User.js");
const CustomError = require("../utils/custom-error.js");
const { makeSearchRegex } = require("../utils/strings.js");

const addUser = async (data) => {
    try {
        const savedUser = await User.create(data);
        if (!savedUser) {
            throw new CustomError(500, "failed to register new user");
        }
        return savedUser;
    } catch (err) {
        throw new CustomError(500, "failed to register new user");
    }
};

const searchUsers = async (searchTerm, options) => {
    searchTerm = makeSearchRegex(searchTerm);
    const filter = {
        $or: [{ username: { $regex: searchTerm } }, { firstName: { $regex: searchTerm } }, { lastName: { $regex: searchTerm } }],
    };
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 20;

    const offset = (page - 1) * limit;
    const resultCount = await User.countDocuments(filter);
    const results = await User.find(filter).skip(offset).limit(limit);
    return {
        resultCount: resultCount,
        page: page,
        limit: limit,
        results: results,
    };
};

const getUserByUsername = async (username) => {
    const data = await User.findOne({ username: username }).select("-password");
    if (!data) {
        throw new CustomError(404, "No user Found");
    }
    return data;
};

const getUser = async (filter) => {
    const data = await User.findOne(filter).select("email password _id");
    return data;
};

const getUserById = async (id) => {
    const data = await User.findOne({ _id: id }).select("-password");
    return data;
};

const updateUser = async (id, update) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, update, {
        new: true,
    }).select("-password -cart");
    return updatedUser;
};

module.exports = {
    addUser,
    getUserByUsername,
    updateUser,
    getUserById,
    searchUsers,
    getUser,
};
