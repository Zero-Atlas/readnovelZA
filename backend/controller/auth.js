const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errorArray = validationResult(req);
  if (!errorArray.isEmpty()) {
    return res.status(403).json({ message: errorArray.array()[0].msg });
  }

  return bcryptjs.hash(password, 8).then((hashPassword) => {
    const user = new User({
      username: username,
      password: hashPassword,
      publicName: {
        name: username,
        title: "Warrior",
      },
      avatar: "/public/images/logo2.png",
      posted: [],
      followed: [],
      history: [],
      level: "rookie",
    });
    return user
      .save()
      .then(() => {
        return res.status(201).json({ message: "account created" });
      })
      .catch((err) => next(err));
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errorArray = validationResult(req);
  if (!errorArray.isEmpty()) {
    return res.status(403).json({ message: errorArray.array()[0].msg });
  }

  return User.findOne({ username: username })
    .then((user) => {
      return bcryptjs.compare(password, user.password).then((result) => {
        if (result) {
          req.session.isLogin = true;
          req.session.user = user;
          return res.status(200).json(user);
        } else {
          return res
            .status(403)
            .json({ message: "Username or password is incorrect." });
        }
      });
    })
    .catch((err) => next(err));
};

exports.postLogout = (req, res, next) => {
  return req.session.destroy((err)=>{
    console.log(err);
    return res.status(200).json({ message: "success" });
  })
};

exports.getUserInfo = (req, res, next) => {
  if (req.user) return res.status(200).json(req.user);
  return res.status(200).json({ message: "Not logged in." });
};
