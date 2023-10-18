const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  list: [
    {
      chapter: { type: Number },
      title: { type: String },
      group: { type: String },
      status: { type: String },
      viewed: { type: String },
      updated: { type: String },
      content: { type: mongoose.Types.ObjectId, ref: "ChapterContent" },
    },
  ],
});

schema.methods.addChapter = (listId) => {
  //add chapter
};

module.exports = mongoose.model("ChapterList", schema);
