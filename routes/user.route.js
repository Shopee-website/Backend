const express = require("express");
const userController = require("../controllers/api/user.controller");
const checkRoleMiddleware = require("../middleware/check-role");
const {uploadImage} = require("../helpers/uploads");

const router = express.Router();

router.get(
    "/profile",
    checkRoleMiddleware.checkRoleUser,
    userController.getUserById
);

var imageNames = [];

router.patch(
    "/update-ava",
    checkRoleMiddleware.checkRoleUser,
    uploadImage("avatars", imageNames).array("images", 1),
    (req, res) => {
        req.body.image = imageNames[0];
        userController.updateAva(req,res);
    }
);

router.patch(
  "/update-profile",
  checkRoleMiddleware.checkRoleUser,
  userController.updateUser
);

module.exports = router;
