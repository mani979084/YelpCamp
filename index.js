if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");

const connectDB = require("./config/mongoDB");
const { store, sessionConfig } = require("./config/mongoStore");

const campgroundRoute = require("./routes/campground");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const User = require("./models/user");

const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const {
  scriptSrcUrls,
  connectSrcUrls,
  styleSrcUrls,
  fontSrcUrls,
} = require("./config/helmet");

connectDB();

store.on("error", (err) => {
  console.log("session store error", err);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/mani9790/",
        "https://images.unsplash.com/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api", userRoute);
app.use("/api/campground", campgroundRoute);
app.use("/api/campground/:id/review", reviewRoute);

app.get("/api/locals", (req, res) => {
  res.json({
    path: req.session.path || null,
    currentUser: req.user || null,
  });
});

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Oh boy,Something went wrong";
  res.json({ error: err.message });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = app;
