const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, "gtm0012");
  console.log(decoded);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.json({
      Message: "invailid credentials",
    });
    return;
  }
}

module.exports = auth;
