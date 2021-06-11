const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');


router.post("/registrar", async (req, res) => {
   
    const serverUrl = req.protocol + '://' + req.get('host');
  
    // guardar en bbdd
    const guardaUsuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,       
        password: req.body.password,
    });
    await guardaUsuario.save();
    return res.json(guardaUsuario);
});

router.get("/", async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);

});

router.get("/:id", async (req, res) => {
    const usuarios = await Usuario.findById(req.params.id);
    res.json(usuarios);

});

router.delete("/:id", async (req, res) => {
    const borraUsuario = await Usuario.findByIdAndDelete(req.params.id);   
    res.json(borraUsuario)

});

module.exports = router;