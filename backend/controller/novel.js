const Novel = require("../model/novel");
const ChapterList = require("../model/chapterList");

exports.getBanner = (req, res, next) => {
  Novel.find({ banner: (value) => value !== undefined })
    .then((novels) => {
      return res.status(200).json(novels);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.getRecent = (req, res, next) => {
  Novel.find().populate('chapters')
    .then((novels) => {
      novels.sort((a, b) => {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      });
      return res.status(200).json(novels.slice(0, 10));
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.getPopular = (req, res, next) => {
  Novel.find().populate('chapters')
    .then((novels) => {
      novels.sort((a, b) => {
        return a.rating.score - b.rating.score;
      });
      return res.status(200).json(novels.slice(0, 10));
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.getNew = (req, res, next) => {
  Novel.find().populate('chapters')
    .then((novels) => {
      novels.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      return res.status(200).json(novels.slice(0, 10));
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.getDetail=(req,res,next)=>{}

exports.getContent=(req,res,next)=>{}