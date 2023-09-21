const jwt = require("jsonwebtoken");

const SECREATKEY = "authkey";

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECREATKEY, (err, decryptData) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decryptData;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJwt, SECREATKEY };
