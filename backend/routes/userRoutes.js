const express = require("express");
const authControllers = require("./../Controllers/authControllers");
const router = express.Router();

router.route("/signup").post(authControllers.signup);
router.route("/login").post(authControllers.login);
router.route("/").get(authControllers.getAllUsers);
router.delete("/delete", authControllers.deleteAllUsers);
module.exports = router;
