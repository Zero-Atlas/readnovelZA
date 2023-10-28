const route = require("express").Router();
const { body } = require("express-validator");

const authController = require("../controller/auth");
const User = require("../model/user");
const usernameRegex = /([\w_]){6,}/g;
const passwordRegex = /[\w!@#$%^&*()]{6,}/g;

// register route
route.post(
  "/register",
  [
    body("username")
      .custom((value) => usernameRegex.test(value))
      .withMessage("Username is invalid.")
      .custom(async (value) => {
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
      .trim()
      .isString()
      .isLength({ min: 6, max: 16 })
      .withMessage("User is invalid.")
      .custom(async (value) => {
        return User.findOne({ username: value }).then((result) => {
          if (!result)
            return Promise.reject("Username or password is incorrect.");
        });
      }),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 6, max: 16 })
      .withMessage("Password is invalid."),
  ],
  authController.postLogin
);

//logout route
route.post("/logout", authController.postLogout);

//get user info on load page
route.get('/get-user-info',authController.getUserInfo)

module.exports = route;
