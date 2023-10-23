const route = require("express").Router();
const { body } = require("express-validator");

const authController = require("../controller/auth");
const User = require("../model/user");
const usernameRegex = /(\w){6,}/g;
const passwordRegex = /[\w!@#$%^&*()]{6,}/g;

// register route
route.post(
  "/register",
  [
    body("username")
      .custom((value) => usernameRegex.test(value))
      .withMessage("Username is invalid.")
      .custom((value) => {
        return User.findOne({ username: value }).then((result) => {
          if (result) return Promise.reject("Username is already exist.");
        });
      }),
    body("password")
      .custom((value) => passwordRegex.test(value))
      .withMessage("Password is invalid."),
  ],
  authController.postRegister
);

//login route
route.post(
  "/login",
  [
    body("username")
      .custom((value) => usernameRegex.test(value))
      .withMessage("User is invalid."),
    body("password")
      .custom((value) => passwordRegex.test(value))
      .withMessage("Password is invalid."),
  ],
  authController.postLogin
);

//logout route
route.post('/logout',authController.postLogout)

module.exports = route;
