const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema(
  {
    key: String,
    nombre: {
      type: String,
      required: true,
    },  
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,        
        required: true
    },
    password: {
        type: String,
        required: true,
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//mongo creará una colección llamada imagens
module.exports = model('Usuario', UsuarioSchema);