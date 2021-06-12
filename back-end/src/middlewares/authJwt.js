const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verificaToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "¡No se proporciona ningún token!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "¡Sin autorización!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verificaToken
};
module.exports = authJwt;