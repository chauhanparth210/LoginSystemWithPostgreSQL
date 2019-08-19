const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const tokan = req.headers.authorization;
    const decode = jwt.verify(tokan, "my-secret-hello-to-everyOne");
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).json({ msg: "auth failed" });
  }
};
