const userController = require("../controller/user");
const isAuth = require("../middleware/isAuth");

const route = require("express").Router();

route.get("/followed", isAuth, userController.getFollowed);

module.exports = route;
