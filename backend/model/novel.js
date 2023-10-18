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
  chapters: { type: mongoose.Types.ObjectId, ref: "ChapterList" },
  updatedAt: { type: String, require: true },
  createdAt: { type: String, require: true },
});

module.exports = mongoose.model("Novel", schema);
