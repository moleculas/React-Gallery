import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { apiUrl } from "../constantes"
import Select from 'react-select';
import options from '../opciones-select'


const GaleriaImagenes = () => {
    const history = useHistory();
    const [images, setImages] = useState([]);
    const [estadoInicialImages, setEstadoInicialImages] = useState([]);
    const [tirasDe12, setTirasDe12] = useState(0)
    const [pagina, setPagina] = useState(1)
    const [paginacionVisible, setPaginacionVisible] = useState(false)
    const [slice, setSlice] = useState([])
    const [items, setItems] = useState([])    
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        (async () => {
            const res = await axios.get(apiUrl + "/api/images")
            setImages((res.data).reverse())
            setEstadoInicialImages((res.data))
        })();
    }, []);

    useEffect(() => {
        setTirasDe12(Math.ceil(images.length / 12))
        setTimeout(() => {

            if (tirasDe12 > 1) {
                setPaginacionVisible(true)

            } else {
                setPaginacionVisible(false)

            }
            for (let i = 1; i <= tirasDe12; i++) {
                items.push(i)
            }
            const offSet = (pagina - 1) * 12
            setSlice(images.slice(offSet, 12 + offSet))
        }, 30);

    }, [images, tirasDe12, items, pagina,]);

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
        if (optionSelected === null) {
            setImages(estadoInicialImages)
        } else {
            setImages(Array.from(estadoInicialImages.filter(item => item.etiquetas.find(element => element === optionSelected.value))))
        }
        setPagina(1)
        setTirasDe12(Math.ceil(images.length / 12))
        setTimeout(() => {
            if (tirasDe12 > 1) {
                setPaginacionVisible(true)
                for (let i = 1; i <= tirasDe12; i++) {
                    items.push(i)
                }
                const offSet = (pagina - 1) * 12
                setSlice(images.slice(offSet, 12 + offSet))
                setItems([])

            } else {
                setPaginacionVisible(false)
                setItems([])
            }

        }, 30);
    }

    const handleChangeSearch = (event) => {
        if (event.target.value === "") {
            setImages(estadoInicialImages)
            setSearchTerm(event.target.value)
            setPagina(1)
            setItems([])
           
        } else {
            setSearchTerm(event.target.value)
        }

    };

    const handleActualizar = () => {
        setImages(estadoInicialImages)
        setPagina(1)
        setItems([])
        setSearchTerm('')
        document.getElementById("search-box").value = ""       
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault()
        setImages(Array.from(estadoInicialImages.filter(item => item.etiquetas.indexOf(searchTerm.toLowerCase()) > -1)))       
        setSearchTerm('')
        document.getElementById("search-box").value = ""
    };

    if (estadoInicialImages.length === 0) {
        return <h1 className="h4 text-center">Todavía no hay imágenes</h1>
    }

    return (

        <div className="container ">
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid p-2">
                    <div className="col s6 p-2" >
                        <Select
                            isClearable
                            placeholder='Etiquetas...'
                            //value={selected}                               
                            // getOptionValue={option => option.value}                                   
                            options={options}
                            onChange={handleChange}
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#0a58ca',
                                    prymary: '#4b4a49',
                                    neutral0: '#212529',
                                    primary: '#eeedec',
                                    neutral80: 'black',
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
                            <input
                                id="search-box"
                                className="form-control bg-dark text-light me-2"
                                type="search"
                                placeholder="Buscar"
                                aria-label="Search"
                                onChange={handleChangeSearch}
                            />
                            <button className="nav-link active d-flex align-items-center text-light btn-primary btn me-2" type="submit"><span className="material-icons">search</span>Buscar</button>
                            <button
                                className="nav-link active d-flex align-items-center text-light btn-primary btn"
                                type="button"
                                onClick={handleActualizar}
                            >
                                <span className="material-icons">refresh</span>Actualizar
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            {images.length===0 ? (
                <div className="alert alert-primary mt-4 d-flex" role="alert">
                    <span className="material-icons me-2">info</span>
                La búsqueda no ha devuelto resultados.
                </div>
            ) : (<div></div>)}

            <div className="row mt-3 p-2">
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
                                    onClick={() => history.push(`/images/${image._id}`)}
                                />
                            </div>
                            <div className="card-footer text-muted">
                                <div dangerouslySetInnerHTML={{ __html: retornaEtiquetas(image.etiquetas) }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                paginacionVisible ? (<nav className="mt-3 bg-black">
                    <ul className="pagination justify-content-center">
                        {/* <li className="page-item disabled ">
                        <a className="page-link bg-transparent text-secondary border border-light" href="#" aria-label="Previous" aria-disabled="true">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li> */}
                        {items.map((item, index) => (
                            item === pagina ? (
                                <li key={index} className="page-link bg-primary disabled border border-dark">
                                    <a className="text-decoration-none text-light cursor-default" href="#" aria-disabled="true">
                                        <span aria-hidden="true">{item}</span>
                                    </a>
                                </li>
                            ) : (
                                <li key={index} className="page-link bg-transparent border border-dark">
                                    <a className="text-decoration-none text-light" onClick={() => (setPagina(item), setItems([]))} href="#">{item}</a>
                                </li>)
                        ))}
                        {/* <li className="page-item disabled">
                        <a className="page-link bg-transparent text-secondary border border-light" href="#" aria-label="Next" aria-disabled="true">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li> */}
                    </ul>
                </nav>) : (<div></div>)
            }

        </div>
    )
}

export default GaleriaImagenes
