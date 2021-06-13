import React, { useContext } from "react"
import logo from "../logo.png"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import ContextoUsuario from '../ContextoUsuario'

const Navbar = (props) => {

  const {usuarioLog, setUsuarioLog} = useContext(ContextoUsuario)

  const cerrarSesion = () => {
    localStorage.clear()
    setUsuarioLog(prevState => ({
      ...prevState,
      nombre: null,
      logged: false
  }))
    props.history.push('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ width: '15%' }} className="App-logo" alt="logo" />  Gestión de imágenes
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        </button>
        <div className="d-flex justify-content-between" id="navbarNav">    
           {
              usuarioLog.nombre ? (<div className="me-4 mt-2"><h5>Hola, {usuarioLog.nombre}</h5></div>): null
            }   
            <div className="btn-group" role="group" aria-label="botonera"> 
            {usuarioLog.logged ? (
              <Link
                className="d-flex align-items-center btn-outline-light btn"
                aria-current="page"
                to="/"
              >
                <span className="material-icons me-2">home</span>
                Inicio
              </Link>
           ) : null}
            {usuarioLog.logged ? (
              <Link
                className="d-flex align-items-center btn-outline-light btn"
                aria-current="page"
                to="/upload"
              >
                <span className="material-icons me-2">file_upload</span>
                Subir imagen
              </Link>
            ) : null}           
            {usuarioLog.logged ? (
              <button
                className="d-flex align-items-center btn-outline-danger btn"
                onClick={cerrarSesion}
              >
                <span className="material-icons me-2">logout</span>
                            Cerrar Sesión
                </button>
           ) : null}
            </div>  
             {!usuarioLog.logged ? (
              <Link
                className="d-flex align-items-center btn-outline-light btn"
                aria-current="page"
                to="/login"
              >
                <span className="material-icons me-2">login</span>
                Acceso
              </Link>
            ) : null}
          
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar)