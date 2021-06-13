import React from "react"

const ContextoUsuario = React.createContext({
  usuarioLog: {
      nombre: null,
      logged: false
  },
  setUsuarioLog: () => {},
  imagenesInicio: [],
  setImagenesInicio: () => {},
});

export default ContextoUsuario;
