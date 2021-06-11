import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex ms-auto">
            <li className="nav-item me-2">
              <Link
                className="nav-link active d-flex align-items-center btn-primary btn"
                aria-current="page"
                to="/"
              >
                <span className="material-icons me-2">home</span>
                Inicio
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link active d-flex align-items-center btn-primary btn"
                aria-current="page"
                to="/upload"
              >
                <span className="material-icons me-2">file_upload</span>
                Subir imagen
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link active d-flex align-items-center btn-primary btn"
                aria-current="page"
                to="/login"
              >
                <span className="material-icons me-2">login</span>
                Login
              </Link>
            </li>
            <li className="nav-item me-2">
              <button
                className="nav-link active d-flex align-items-center btn-danger btn"
              // onClick={() => cerrarSesion()}
              >
                <span className="material-icons me-2">logout</span>
                            Cerrar Sesión
                </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;