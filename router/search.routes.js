const router = require("express").Router();
const searchController = require("../controller/search.controller");

router.get("/users", searchController.searchUsers);
router.get("/tweets", searchController.searchTweet);

module.exports = router;
