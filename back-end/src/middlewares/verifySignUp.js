const Usuario = require("../models/Usuario");

checkDuplicadoNombreOMail = (req, res, next) => {
 // Nombre
  Usuario.findOne({
    nombre: req.body.nombre
  }).exec((err, usuario) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (usuario) {
      res.status(400).send({ message: "Fallo! El nombre ya está en uso." });
      return;
    }

    // Email
    Usuario.findOne({
      email: req.body.email
    }).exec((err, usuario) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (usuario) {
        res.status(400).send({ message: "Fallo! El email ya está en uso." });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
    checkDuplicadoNombreOMail
};

module.exports = verifySignUp;