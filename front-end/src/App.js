import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import ImagenDetalle from './paginas/ImagenDetalle'
import GaleriaImagenes from './paginas/GaleriaImagenes'
import ImagenForm from './paginas/ImagenForm'
import Login from './paginas/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from "./componentes/Navbar";
import ContextoUsuario from './ContextoUsuario'
import axios from "axios"
import { apiUrl } from "./constantes"

function App() {

  const checkUsuarioReg = () => {
    try {
      let decoded = jwt_decode(localStorage.getItem("token"))
      let nombreLS = JSON.parse(localStorage.getItem("nombre"))
      if (decoded.id) {
        const retornoCheck = {
          nombre: nombreLS,
          logged: true
        }
        return retornoCheck
      }
    } catch (error) {
      const retornoCheck = {
        nombre: null,
        logged: false
      }
      return retornoCheck
    }
  }

  const [usuarioLog, setUsuarioLog] = useState(checkUsuarioReg())
  const [imagenesInicio, setImagenesInicio] = useState([])

   useEffect(() => {
        if (usuarioLog) {
            (async () => {
                const res = await axios.get(apiUrl + "/api/images")               
                setImagenesInicio((res.data).reverse())                
            })();
        }
    }, [usuarioLog, setImagenesInicio])

  const valorContexto = { usuarioLog, setUsuarioLog, imagenesInicio, setImagenesInicio }

  return (
    <ContextoUsuario.Provider value={valorContexto}>
      <div className="principal text-light">
        <Navbar />
        <div className="container p-4">
          <Switch>
            <Route path="/" exact component={GaleriaImagenes} />
            <Route path="/upload" component={ImagenForm} />
            <Route path="/images/:id" component={ImagenDetalle} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </ContextoUsuario.Provider>
  );
}

export default App
