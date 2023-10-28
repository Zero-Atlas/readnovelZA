const { Types } = require("mongoose");
const Novel = require("../model/novel");

module.exports.getFollowed = (req, res, next) => {
  if (req.user) {
    return Novel.find({
      _id: { $in: req.user.followed.map((v) => Types.ObjectId(v)) },
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => next(err));
  } else {
    return res.status(200).json({ message: "Please login." });
  }
};

module.exports.getHistory = (req, res, next) => {
  if (req.user) {
    return Novel.find({
      name: { $in: req.user.history },
    })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => next(err));
  } else {
    return res.status(200).json({ message: "Please login." });
  }
};

//save data for user
module.exports.postFollowed = (req, res, next) => {
  const followed = req.body;
  req.user.followed = followed;
  return req.user
    .save()
    .then(() => res.status(200).json({ message: "success" }))
    .catch((err) => next(err));
};

module.exports.postHistory = (req, res, next) => {
  const history = req.body;
  req.user.history = history;
  return req.user
    .save()
    .then(() => res.status(200).json({ message: "success" }))
    .catch((err) => next(err));
};
