const Imagen = require('../models/Imagen');
const fs = require('fs');

exports.upload =async (req, res) => {
    const { file } = req.files;
    const imagenPass=res.locals.nombreImagen
    await file.mv(`../front-end/public/files/${imagenPass}`)
    const serverUrl = req.protocol + '://' + req.get('host');
    const urlImage = `/files/${imagenPass}`;   
    let etiquetasRec = req.body.etiquetas; 
    let etiquetasArray=etiquetasRec.split(",")
    // guardar en bbdd
    const guardaImagen = new Imagen({
        url: urlImage,
        key: imagenPass,       
        etiquetas: etiquetasArray,
        autor: req.body.autor,
        resolucion: req.body.resolucion,
        peso: req.body.peso
    });
    await guardaImagen.save();
    return res.json(guardaImagen);
};

exports.getImagenes =async (req, res) => {
    const imagenes = await Imagen.find();
    res.json(imagenes);   
};

exports.getImage =async (req, res) => {
    const imagenes = await Imagen.findById(req.params.id);
    res.json(imagenes);
};

exports.delete =async (req, res) => {
    const borraImagen = await Imagen.findByIdAndDelete(req.params.id);
    fs.unlink(`../front-end/public/files/${borraImagen.key}`, (err) => {
        if (err) console.log(error);
        console.log('imagen borrada');
    });
    res.json(borraImagen)
};