const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.renderRegister = (req, res) => {
  res.json({ success: "Showing Register" });
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = new User({
      email,
      username,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      const { _id, email, username } = req.user;
      const payload = {
        user: { _id, email, username },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, success: "Successfully Registered" });
        }
      );
    });
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports.renderLogin = (req, res) => {
  res.json({ success: "Showing Login" });
};

module.exports.loginUser = (req, res) => {
  const newurl =
    req.session.returnTo && req.session.returnTo.replace("/api/", "/");
  const url = newurl || "/campground";
  delete req.session.returnTo;
  const { _id, email, username } = req.user;
  const payload = {
    user: { _id, email, username },
  };

  jwt.sign(
    payload,
    process.env.jwtSecret,
    { expiresIn: "5 days" },
    (err, token) => {
      if (err) throw err;
      res.json({ token, url, success: "Welcome Back!" });
    }
  );
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.json({ success: "Successfully Logged Out" });
};
