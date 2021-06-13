const { Schema, model } = require('mongoose');

const ImagenSchema = new Schema(
  {
    key: String,
    url: {
      type: String,
      required: true,
    },
    etiquetas: {
      type: [String], default: []
    },
    autor: {
      type: String,
      required: true,
    },
    resolucion: {
      type: String,
      required: true,
    },
    peso: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//mongo creará una colección llamada imagens
module.exports = model('Imagen', ImagenSchema);
