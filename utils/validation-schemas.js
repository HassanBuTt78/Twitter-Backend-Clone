const joi = require("joi");
const categories = ["electronics", "apparel", "home", "beauty", "outdoors"];

const types = {
    email: joi.string().email(),
    name: joi.string().max(20),
    password: joi.string().min(8).max(30),
    tweet: joi.string().min(1).max(240),
    objectId: joi.string().hex().length(24),
};

const validationSchemas = {
    registor: joi.object({
        firstName: types.name.required(),
        lastName: types.name,
        username: types.name.required(),
        email: types.email.required(),
        password: types.password.required(),
    }),
    login: joi.object({
        email: types.email.required(),
        password: types.password.required(),
    }),
    userUpdate: joi.object({
        firstName: types.name,
        lastName: types.name,
        verified: joi.bool(),
        username: types.name,
    }),
    updatePassword: joi.object({
        password: types.password.required(),
    }),
    resetPassByEmail: joi.object({
        email: types.email.required(),
    }),
    newTweet: joi.object({
        content: types.tweet.required(),
        replied: types.objectId,
        media: types.objectId,
    }),
};

module.exports = validationSchemas;
