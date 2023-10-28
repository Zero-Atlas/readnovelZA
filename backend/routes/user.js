const userController = require("../controller/user");
const isAuth = require("../middleware/isAuth");

const route = require("express").Router();

route.get("/followed", isAuth, userController.getFollowed);
route.get("/history", isAuth, userController.getHistory);

//save user data
route.post("/followed", isAuth, userController.postFollowed);
route.post("/history", isAuth, userController.postHistory);
route.post("/public-name", isAuth, userController.postPublicName);

module.exports = route;
