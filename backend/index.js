const path = require("path");

//package use
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

//import route
const novelRouter = require("./routes/novel");

//database init
const MONGODB_URI =
  "mongodb+srv://andachuynh:qMExsQpmRvHnR5L4@movie-site.kpkcv1h.mongodb.net/novel";

//multer init
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toString().replace(/([:])/g, "-") + "-" + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// express init
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(
  "/public",
  express.static(path.join(__dirname, "public"))
);

//route
app.use("/novel", novelRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
