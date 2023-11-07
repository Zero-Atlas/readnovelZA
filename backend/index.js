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
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const User = require("./model/user");

//database init
const MONGODB_URI =
  process.env.MONGODB_CONNECTION ||
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@movie-site.kpkcv1h.mongodb.net/${process.env.MONGO_DATABASE}`;

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
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/public", express.static(path.join(__dirname, "public")));

//session init
app.use(
  session({
    store: store,
    secret: "readnovel secret",
    resave: false,
    saveUninitialized: false,
    name: "readnovelSession",
    cookie: {
      sameSite: "lax",
      secure: Boolean(process.env.production),
      httpOnly: true,
    },
  })
);

// authorized user init
app.set("trust proxy", 1);
app.use("/", (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
    "allowedHeaders,socket.io"
  );

  if (!req.session.user) return next();

  return User.findById(req.session.user._id)
    .then((user) => {
      if (user) req.user = user;
      return next();
    })
    .catch((err) => next(err));
});

//route
app.use("/novel", novelRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

//error handler
app.use((error, req, res, next) => {
  res.status(500).json({
    message: "Some error occured on server",
    error,
  });
});

//route not found handler
app.use(function (req, res, next) {
  res.status(404);
  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to database");
    const server = app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
