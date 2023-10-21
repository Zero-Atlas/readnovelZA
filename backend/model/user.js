const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, require: true },
  publicName: {
    name: { type: String, require: true },
    title: { type: String, require: true },
  },
  password: { type: String, require: true },
  avatar: { type: String },
  posted: [{ type: mongoose.Types.ObjectId, ref: "Novel" }],
  followed: [{ type: mongoose.Types.ObjectId, ref: "Novel" }],
  history: [{ type: mongoose.Types.ObjectId, ref: "Novel" }],
});

module.exports = mongoose.model("User", schema);
