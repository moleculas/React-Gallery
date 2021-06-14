import React, { useState, useEffect, useCallback, useContext } from "react"
import axios from "axios"
import { apiUrl } from "../constantes-f"
import { withRouter } from "react-router-dom";
import ContextoUsuario from '../ContextoUsuario';

const Login = (props) => {

    const {usuarioLog, setUsuarioLog} = useContext(ContextoUsuario);

    useEffect(() => {
        if (usuarioLog.logged) {
            props.history.push('/')
        }
    }, [usuarioLog, props.history])

    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [esRegistro, setEsRegistro] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)
    const [contenidoAlerts, setContenidoAlerts] = useState(null)

    useEffect(() => {
        if (error) {
            const contenidoEr = `<div class="alert mt-3 alert-danger">${error}</div>`
            setContenidoAlerts(contenidoEr)
            setError(null)
        }
        if (exito) {
            const contenidoEx = `<div class="alert mt-3 alert-info">${exito}</div>`
            setContenidoAlerts(contenidoEx)
            setExito(null)
        }
    }, [exito, error]);

    const handleEsRegistro = () => {
        setEsRegistro(!esRegistro)
        setContenidoAlerts(null)
        setEmail('');
        setNombre('');
        setPassword('')
    }

    const procesarDatos = (e) => {
        e.preventDefault()

        if (!nombre.trim()) {
            setError('Datos vacíos nombre!')
            return
        }
        if (esRegistro) {
            if (!email.trim()) {
                setError('Datos vacíos email!')
                return
            }
        }
        if (!password.trim()) {
            setError('Datos vacíos pass!')
            return
        }
        if (password.length < 6) {
            setError('6 o más carácteres en pass')
            return
        }
        setError(null)
        if (esRegistro) {
            registrar(e)
        } else {
            logear()
        }

    }

    const logear = useCallback(async () => {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("password", password);
        await axios.post(apiUrl + "/api/usuarios/auth/signin", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {                  
            localStorage.setItem("token", JSON.stringify(response.data.accessToken))
            localStorage.setItem("nombre", JSON.stringify(response.data.nombre))
            setUsuarioLog(prevState => ({
                ...prevState,
                nombre: response.data.nombre,
                logged: true
            }))
           props.history.push('/')          
           return

        }).catch(err => {
            setError(err.response.data.message)
            return
        })
    }, [password, nombre, props.history, setUsuarioLog])

    const registrar = useCallback(async (e) => {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("password", password);
        await axios.post(apiUrl + "/api/usuarios/auth/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            setEmail('');
            setNombre('');
            setPassword('')
            e.target.reset()            
            setExito('Usuario registrado')
            setEsRegistro(!esRegistro)
            return

        }).catch(err => {
            setError(err.response.data.message)
            return
        })
    }, [esRegistro, email, password, nombre])

    return (
        <div className="col-md-6 offset-md-3 mt-5">

            <div className="card bg-dark text-light rounded-0 p-4">
                <div className="card-body">
                    <h1 className="h3 card-title">
                        {
                            esRegistro ? 'Registro' : 'Login'
                        }
                    </h1>
                    <form onSubmit={procesarDatos}>
                        <div dangerouslySetInnerHTML={{ __html: contenidoAlerts }} />

                        <div className="row mt-3">
                            <div className="col-12 mb-2">
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light  border border-secondary"
                                    placeholder="Ingresa Nombre"
                                    onChange={e => setNombre(e.target.value)}
                                    value={nombre}
                                />
                            </div>
                            {esRegistro ? (
                                <div className="col-12 mb-2">
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-light  border border-secondary"
                                        placeholder="Ingresa Email"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                            ) : null}

                            <div className="col-12 mb-2">
                                <input
                                    type="password"
                                    className="form-control bg-dark text-light border border-secondary"
                                    placeholder="Ingresa Contraseña"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                        </div>

                        <div className="my-3 d-flex">
                            <button
                                className="d-flex align-items-center btn-outline-light btn col-6 me-2"
                                type="submit"
                            >
                                {esRegistro ? 'Registrar' : 'Acceder'}
                            </button>
                            <button
                                className="d-flex align-items-center btn-outline-info btn col-6"
                                type="button"
                                onClick={handleEsRegistro}
                            >
                                {esRegistro ? 'Login usuario' : 'Registro usuario'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
