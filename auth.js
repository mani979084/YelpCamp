const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    jwt.verify(token, process.env.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ error: "Server Error" });
  }
};
