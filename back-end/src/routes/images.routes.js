const { Router } = require('express');
const router = Router();
const Imagen = require('../models/Imagen');
const fs = require('fs');

router.post("/upload", async (req, res) => {
    const { file } = req.files;

    await file.mv(`../front-end/public/files/${file.name}`)
    const serverUrl = req.protocol + '://' + req.get('host');
    const urlImage = `/files/${file.name}`;   
    let etiquetasRec = req.body.etiquetas; 
    let etiquetasArray=etiquetasRec.split(",")
    // guardar en bbdd
    const guardaImagen = new Imagen({
        url: urlImage,
        key: file.name,       
        etiquetas: etiquetasArray,
    });
    await guardaImagen.save();
    return res.json(guardaImagen);
});

router.get("/", async (req, res) => {
    const imagenes = await Imagen.find();
    res.json(imagenes);

});

router.get("/:id", async (req, res) => {
    const imagenes = await Imagen.findById(req.params.id);
    res.json(imagenes);

});

router.delete("/:id", async (req, res) => {
    const borraImagen = await Imagen.findByIdAndDelete(req.params.id);
    fs.unlink(`../front-end/public/files/${borraImagen.key}`, (err) => {
        if (err) console.log(error);
        console.log('imagen borrada');
    });
    res.json(borraImagen)

});

module.exports = router;