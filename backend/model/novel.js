const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, require: true },
  other: { type: String, require: true },
  author: { type: String, require: true },
  status: { type: String, require: true },
  rating: { rated: { type: Number }, score: { type: Number } },
  image: { type: String, require: true },
  banner: { type: String },
  description: { type: String, require: true },
  category: { type: Array, require: true },
  updatedAt: { type: String, require: true },
  createdAt: { type: String, require: true },
  chapters: [
    {
      chapter: { type: Number },
      title: { type: String },
      group: { type: String },
      status: { type: String },
      viewed: { type: Number },
      updatedAt: { type: String },
      content: { type: mongoose.Types.ObjectId, ref: "ChapterContent" },
    },
  ],
});

module.exports = mongoose.model("Novel", schema);
