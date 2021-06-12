import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { apiUrl } from "../constantes"
import { Link } from "react-router-dom"

const ImagenDetalle = () => {
  const [image, setImage] = useState({   
    url: "",
    _id: "",
    etiquetas: [],
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${apiUrl}/api/images/${params.id}`);
      setImage(res.data);   
    })();

  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás segur@ que quieres borrar la imagen?")) {
       await axios.delete(`${apiUrl}/api/images/${params.id}`);
      window.location.href = '/';
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

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <div className="card bg-dark">
          <img src={image.url} alt={image._id} className="card-img-top" />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="mt-1">Imagen #{image._id}</h5>
              <div dangerouslySetInnerHTML={{ __html: retornaEtiquetas(image.etiquetas) }} />
            </div>

            <hr />
            <div className="col s6 d-flex mt-2" >
              <button
                className="nav-link active d-flex align-items-center text-light btn-danger btn me-2"
                onClick={handleDelete}
              >
                <span className="material-icons" >delete</span>Borrar
            </button>

              <Link
                className="nav-link active d-flex align-items-center text-light btn-primary btn me-2"
                to={image.url}
                target="_blank" download><span className="material-icons" ><span className="material-icons-outlined">file_download</span></span>Descargar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagenDetalle
