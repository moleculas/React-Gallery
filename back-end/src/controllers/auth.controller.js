const config = require("../config/auth.config");
const Usuario = require("../models/Usuario");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup =async (req, res) => {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    await usuario.save((err, usuario) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }else{
            return res.json(usuario);
        }
    });
};

exports.signin = async (req, res) => {
    await Usuario.findOne({
        nombre: req.body.nombre
    })
        // .populate("roles", "-__v")
        .exec((err, usuario) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!usuario) {
                return res.status(404).send({ message: "Usuario no encontrado." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                usuario.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Password no correcto!"
                });
            }

            var token = jwt.sign({ id: usuario.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                accessToken: token
            });
        });
};