const Novel = require("../model/novel");
const ChapterContent = require("../model/chapterContent");
const { urlToName } = require("../util/convertString");
const { paging } = require("../util/paging");

exports.getBanner = (req, res, next) => {
  return Novel.find()
    .select("banner name")
    .then((novels) => {
      return res.status(200).json(novels.filter((novel) => novel.banner));
    })
    .catch((err) => next(err));
};
exports.getAll = (req, res, next) => {
  return Novel.find()
    .then((novels) => {
      return res.status(200).json(novels);
    })
    .catch((err) => next(err));
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
    .catch((err) => next(err));
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
    .catch((err) => next(err));
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
    .catch((err) => next(err));
};

exports.getDetail = (req, res, next) => {
  const novelName = req.params.novelName;
  return Novel.findOne({ name: novelName })
    .then((novel) => {
      if (novel) return res.status(200).json(novel);
      else return res.status(202).json({ message: "Could not found novel" });
    })
    .catch((err) => next(err));
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
    .catch((err) => next(err));
};

exports.getCategory = (req, res, next) => {
  return Novel.find()
    .select("category")
    .then((novels) => {
      const catList = novels
        .map((oj) => oj.category)
        .flat()
        .filter((value, index, arr) => {
          if (arr.indexOf(value) === arr.lastIndexOf(value)) return true;
          if (index === arr.indexOf(value)) return true;
          return false;
        });
      return res.status(200).json(catList);
    })
    .catch((err) => next(err));
};

exports.postSearch = (req, res, next) => {
  const genre = urlToName(req.query.genre) || "";
  return Novel.find({ category: genre })
    .select("name image updatedAt createdAt rating")
    .then((novels) => {
      return res.status(200).json(paging(novels, Number(req.query.page), 10));
    })
    .catch((err) => next(err));
};
