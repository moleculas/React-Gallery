import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { apiUrl } from "../constantes"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { useHistory } from "react-router-dom"
import ContextoUsuario from '../ContextoUsuario'

const ImagenDetalle = (props) => {

  const { usuarioLog, imagenesInicio } = useContext(ContextoUsuario)
  const history = useHistory()  
  const [foundId, setFoundId] = useState(null)

  useEffect(() => {
    if (!usuarioLog.logged) {
      props.history.push('/login')
    }
  }, [usuarioLog, props.history])

  const [image, setImage] = useState({
    url: "",
    _id: "",
    etiquetas: [],
    autor: ""
  })

  const params = useParams()

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${apiUrl}/api/images/${params.id}`)
      setImage(res.data)
    })();

  }, [params.id])

  useEffect(() => {    
    const foundedId = imagenesInicio.findIndex(element => element._id===image._id)
      setFoundId(foundedId)  
  }, [imagenesInicio, image._id])

  const handleDelete = async () => {
    if (window.confirm("¿Estás segur@ que quieres borrar la imagen?")) {
      await axios.delete(`${apiUrl}/api/images/${params.id}`)
      window.location.href = '/'
    }
  }

  const retornaEtiquetas = (imagen_etiquetas) => {
    const splitted = []
    let aRetornar = ""
    imagen_etiquetas.map((etiqueta) => {
      splitted.push(etiqueta.split(","))
      return true
    })
    splitted.map((split) => {
      split.forEach(element => { aRetornar = aRetornar + `&nbsp;<h4 class="d-inline"><span class="badge bg-secondary cursor-default">${element}</span></h4>` })
      return true
    })
    return aRetornar
  }

  const handleNavegacion =(direccion) => {      
    if (direccion === 'atras') {
      history.push({
        pathname: `/images/${imagenesInicio[foundId-1]._id}`
      })
    } else {
      history.push({
        pathname: `/images/${imagenesInicio[foundId+1]._id}`
      })
    }
  }

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <div className="d-flex align-items-center">
          <button type="button" onClick={() => handleNavegacion('atras')} className={`btn btn-dark me-4 btn-sm ${foundId <= 0 ? `disabled` : `enabled`}`}><span className="material-icons">arrow_back</span></button>
          <div className="card bg-dark">
            <img src={image.url} alt={image._id} className="card-img-top" />
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 >Imagen #{image._id}</h5>
                <div dangerouslySetInnerHTML={{ __html: retornaEtiquetas(image.etiquetas) }} />
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="col s6 d-flex" >
                  {image.autor === usuarioLog.nombre ? (
                    <button
                      className="d-flex align-items-center btn-outline-danger btn me-1"
                      onClick={handleDelete}
                    >
                      <span className="material-icons" >delete</span>Borrar
                    </button>
                  ) : null}
                  <Link
                    className="d-flex align-items-center btn-outline-light btn me-1"
                    to={image.url}
                    target="_blank" download><span className="material-icons" ><span className="material-icons-outlined">file_download</span></span>Descargar</Link>
                </div>
                <div className="d-flex"><h6 className="mt-3 me-2">Resolución: {image.resolucion} Peso: {image.peso} - Imagen subida por: {image.autor}</h6></div>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => handleNavegacion('adelante')} className={`btn btn-dark ms-4 btn-sm ${foundId > imagenesInicio.length-2 ? `disabled` : `enabled`}`}><span className="material-icons">arrow_forward</span></button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ImagenDetalle)
