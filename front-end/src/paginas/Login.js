import React, { useState } from "react"
import axios from "axios"
import { apiUrl } from "../constantes"

const Login = () => {

    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [esRegistro, setEsRegistro] = useState(true)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const procesarDatos = async (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            setError('Datos vacíos nombre!')
            return
        }
        if (!email.trim()) {
            setError('Datos vacíos email!')
            return
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
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("password", password);
        await axios.post(apiUrl + "/api/usuarios/registrar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        setEmail('');
        setNombre('');
        setPassword('');
        e.target.reset()
        window.location.href = '/login';

    }

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
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }

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
                            <div className="col-12 mb-2">
                                <input
                                    type="email"
                                    className="form-control bg-dark text-light  border border-secondary"
                                    placeholder="Ingresa Email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
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
                                className="nav-link active d-flex align-items-center btn-primary text-light btn col-6 me-2"
                                type="submit"
                            >
                                {esRegistro ? 'Registrar' : 'Acceder'}
                            </button>
                            <button
                                className="nav-link active d-flex align-items-center btn-info btn col-6"
                                type="button"
                                onClick={() => setEsRegistro(!esRegistro)}
                            >
                                {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
