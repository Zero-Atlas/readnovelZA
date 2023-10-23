const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const {validationResult}=require('express-validator')

exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errorArray=validationResult(req)
  if(!errorArray.isEmpty()){
    return res.status(403).json({message:errorArray.array()[0].msg})
  }

  return bcryptjs.hash(password, 16).then((hashPassword) => {
    const user = new User({
      username: username,
      password: hashPassword,
      publicName: {
        name: username,
        title: "Warrior",
      },
      avatar: "/public/logo2.png",
      posted: [],
      followed: [],
      history: [],
    });
    return user.save().then(() => {
      return res.status(201).json({ message: "account created" });
    });
  });
};
exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errorArray=validationResult(req)
  if(!errorArray.isEmpty()){
    return res.status(403).json({message:errorArray.array()[0].msg})
  }

  return User.findOne({ username: username }).then((user) => {
    if (user)
      return bcryptjs.compare(password, user.password).then((result) => {
        if (result) {
          return res.status(200).json(user);
        } else {
          return res
            .status(403)
            .json({ message: "Username or password is incorrect." });
        }
      });
    else
      return res
        .status(403)
        .json({ message: "Username or password is incorrect." });
  });
};

exports.postLogout=(req,res,next)=>{
  return res.status(200).json({message:"success"})
}