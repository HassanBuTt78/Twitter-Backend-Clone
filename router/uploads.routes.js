const express = require("express");
const router = express.Router();

const gallaryController = require("../controller/upload.controller.js");
const upload = require("../middleware/file-upload.js");
const userAuthorize = require("../middleware/user-authorization.js");

router.get("/", [userAuthorize], gallaryController.getAllUploads);
router.post("/", [userAuthorize, upload.single("image")], gallaryController.uploadImage);

module.exports = router;
