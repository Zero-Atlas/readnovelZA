const Novel = require("../model/novel");
const ChapterContent = require("../model/chapterContent");

exports.getBanner = (req, res, next) => {
  return Novel.find()
    .select("banner name")
    .then((novels) => {
      return res.status(200).json(novels.filter((novel) => novel.banner));
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
exports.getAll = (req, res, next) => {
  return Novel.find()
    .then((novels) => {
      return res.status(200).json(novels);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.getRecent = (req, res, next) => {
  return Novel.find()
    .select("image name chapters")
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
  return Novel.find()
    .select("image name chapters")
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
  return Novel.find()
    .select("image name chapters")
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

exports.getDetail = (req, res, next) => {
  const novelName = req.params.novelName;
  return Novel.findOne({ name: novelName })
    .then((novel) => {
      if (novel) return res.status(200).json(novel);
      else return res.status(202).json({ message: "Could not found novel" });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

exports.getContent = (req, res, next) => {
  const novelName = req.params.novelName;
  const chapterNo = Number(req.params.chapterNo);
  return Novel.findOne({ name: novelName })
    .then((novel) => {
      if (novel) {
        const chapter = novel.chapters.find((c) => c.chapter === chapterNo);
        if (chapter) {
          return ChapterContent.findById(chapter.content).then((content) =>
            res.status(200).json(content)
          );
        } else
          return res.status(202).json({ message: "Could not found chapter" });
      } else return res.status(202).json({ message: "Could not found novel" });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
