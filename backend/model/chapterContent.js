const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  list: { type: String, require: true },
});

module.exports = mongoose.model("ChapterContent", schema);
