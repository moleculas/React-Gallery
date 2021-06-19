import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import Select from 'react-select'
import options from '../opciones-select'
import { withRouter } from "react-router-dom"
import ContextoUsuario from '../ContextoUsuario'

const GaleriaImagenes = (props) => {

    const { usuarioLog, imagenesInicio } = useContext(ContextoUsuario)

    useEffect(() => {
        if (!usuarioLog.logged) {
            props.history.push('/login')
        }
    }, [usuarioLog, props.history])

    const history = useHistory()
    const [images, setImages] = useState([])
    const [pagina, setPagina] = useState(1)
    const [paginacionVisible, setPaginacionVisible] = useState(false)
    const [slice, setSlice] = useState([])
    const [items, setItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    const imagesLoaded = () => {
        const imgElements = [document.getElementById("galeria").querySelectorAll("img")];
        for (let i = 0; i < imgElements.length; i += 1) {
            const img = imgElements[i];
            if (!img[i].complete) {
                return false;
            } else {
                return true;
            }
        }
    }

    const handleImagenLoaded = () => {
        setLoading(!imagesLoaded())
    }

    const handleImagenError = () => {
        console.log('imagen error')
    }

    useEffect(() => {
        setImages(imagenesInicio)
    }, [imagenesInicio])

    useEffect(() => {
        if (usuarioLog) {
            const tirasDe12 = Math.ceil(images.length / 12)
            if (tirasDe12 > 1) {
                setPaginacionVisible(true)
                for (let i = 1; i <= tirasDe12; i++) {
                    items.push(i)
                }
            } else {
                setPaginacionVisible(false)
            }
            const offSet = (pagina - 1) * 12
            setSlice(images.slice(offSet, 12 + offSet))
        }
    }, [images, pagina, usuarioLog, items]);
   
    const retornaEtiquetas = (imagen_etiquetas) => {
        const splitted = []
        let aRetornar = ""
        imagen_etiquetas.map((etiqueta) => {
            splitted.push(etiqueta.split(","))
            return true
        })
        splitted.map((split) => {
            split.forEach(element => { aRetornar = aRetornar + `&nbsp;<span class="badge bg-secondary cursor-default">${element}</span>` })
            return true
        })
        return aRetornar
    }

    const handleChange = (optionSelected) => {
        setItems([])
        setPagina(1)
        if (optionSelected === null) {
            setImages(imagenesInicio)
        } else {
            setImages(Array.from(imagenesInicio.filter(item => item.etiquetas.find(element => element === optionSelected.value))))
        }
    }

    const handleChangeSearch = (event) => {
        if (event.target.value === "") {
            setItems([])
            setPagina(1)
            setImages(imagenesInicio)
            setSearchTerm(event.target.value)
        } else {
            setSearchTerm(event.target.value)
        }
    }

    const handleActualizar = () => {
        setItems([])
        setPagina(1)
        setImages(imagenesInicio)
        document.getElementById("search-box").value = ""
    }

    const handleSubmitSearch = (event) => {
        setItems([])
        setPagina(1)
        event.preventDefault()
        setImages(Array.from(imagenesInicio.filter(item => item.etiquetas.indexOf(searchTerm.toLowerCase()) > -1)))
        setSearchTerm('')
        document.getElementById("search-box").value = ""       
    }

    if (imagenesInicio.length === 0 && usuarioLog) {
        return <h1 className="h4 text-center">Todavía no hay imágenes</h1>
    }

    return (
        <div className="container ">
            {loading ? (<div className="container p-4 fondo-spinner" style={{ zIndex: 99, position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '9rem' }}>
                <div className="spinner-border" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>) : (<div></div>)}
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid p-2">
                    <div className="col s6 p-2" >
                        <Select
                            isClearable
                            placeholder='Etiquetas...'
                            options={options}
                            onChange={handleChange}
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'grey',
                                    prymary: '#4b4a49',
                                    neutral0: '#212529',
                                    primary: '#eeedec',
                                    neutral80: 'grey',
                                    primary50: '#4b4a49',
                                    neutral60: '#ffffff',
                                    neutral40: '#ffffff',
                                },
                            })}
                        />
                    </div>
                    <div className="col s6 p-2" >
                        <form
                            className="d-flex"
                            onSubmit={handleSubmitSearch}
                        >
                            <div className="input-group me-2" role="group" aria-label="Basic example">
                                <input
                                    id="search-box"
                                    className="form-control bg-dark text-light"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    onChange={handleChangeSearch}
                                />
                                <button className="d-flex align-items-center btn-outline-light btn" type="submit"><span className="material-icons">search</span>Buscar</button>
                                <button
                                    className="d-flex align-items-center btn-outline-light btn"
                                    type="button"
                                    onClick={handleActualizar}
                                >
                                    <span className="material-icons">refresh</span>Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            {images.length === 0 ? (
                <div className="alert alert-primary mt-4 d-flex" role="alert">
                    <span className="material-icons me-2">info</span>
                    La búsqueda no ha devuelto resultados.
                </div>
            ) : (<div></div>)}
            <div className="row mt-3 p-2" id="galeria">
                {slice.map((image) => (
                    <div
                        className="col-md-4 p-1"
                        key={image._id}
                    >
                        <div className="card bg-dark h-100 card-image">
                            <div className="card-body">
                                <img
                                    src={image.url}
                                    alt=""
                                    className="img-fluid h-100 w-100 cursor-pointer"
                                    style={{ objectFit: "cover" }}
                                    onClick={() => history.push({
                                        pathname: `/images/${image._id}`
                                    })}
                                    onLoad={handleImagenLoaded}
                                    onError={handleImagenError}
                                />
                            </div>
                            <div className="card-footer text-muted">
                                <div dangerouslySetInnerHTML={{ __html: retornaEtiquetas(image.etiquetas) }} />
                                <div className="p-1"><small>Res: {image.resolucion} Peso: {image.peso} - Por: {image.autor}</small></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                paginacionVisible ? (<nav className="mt-3 bg-black">
                    <div className="pagination justify-content-center">
                        <div className="btn-toolbar" role="toolbar" aria-label="paginacion">
                            <div className="btn-group me-2" role="group" >
                                {items.map((item, index) => (
                                    item === pagina ? (
                                        <button key={index} type="button" className="btn btn-dark" disabled>{item}</button>
                                    ) : (
                                        <button key={index} onClick={() => { setPagina(item); setItems([]) }} type="button" className="btn btn-dark">{item}</button>
                                    )))}
                            </div>
                        </div>
                    </div>
                </nav>) : null
            }
        </div>
    )
}

export default withRouter(GaleriaImagenes)