const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    req.userId = decoded.id;
  } else {
    res.json({
      Message: "invaild credentails",
    });
    return;
  }
}

module.exports = auth;
