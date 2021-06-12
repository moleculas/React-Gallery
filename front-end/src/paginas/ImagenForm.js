import React, { useState } from "react"
import axios from "axios"
import options from '../opciones-select'
import CreatableSelect from 'react-select/creatable'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { apiUrl } from "../constantes"


const ImageForm = () => {

    const [file, setFile] = useState(null)    
    const [etiquetas, setEtiquetas] = useState([])
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [preFile, setPreFile] = useState(null)
    
    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setPreFile(URL.createObjectURL(e.target.files[0]))

    };
    const handleChangeEtiquetas = (e) => {
        const size = Object.keys(e).length
        if (size > 0) {
            const ultimoValor = e[size - 1].value
            // const etiquetas = [...etiquetas];
            etiquetas.push(ultimoValor.toLowerCase())   
        } else {
            setEtiquetas([])
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);      
        formData.append("etiquetas", etiquetas);

        await axios.post(apiUrl + "/api/images/upload", formData, {            
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;

                let percent = parseInt((loaded * 100) / total);
                setUploadPercentage(percent);
            },
        }).then(response =>{
            console.log(response.data);          
            setLoading(false);
            setUploadPercentage(0);
            setEtiquetas([]);       
            setFile(null);
            e.target.reset()
           window.location.href = '/upload';
           
          }).catch(err =>{
            console.log(err.response.data);
          });        
    };

    const resetImage = () => {
        setFile(null)
        setPreFile(null)
        document.getElementById("uploadCaptureInputFile").value = "";
    }

    return (
        <div className="col-md-8 offset-md-2 mt-5">
            {loading && (
                <div className="progress rounded-0">
                    <div
                        className="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style={{ width: `${uploadPercentage}%` }}
                    >
                        {uploadPercentage}%
          </div>
                </div>
            )}

            <div className="card bg-dark text-light rounded-0 p-4">
                <div className="card-body">
                    <h1 className="h3 card-title">Subir imagen</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Upload Input */}                        
                        <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip id="tooltip-disabled">Selecciona las etiquetas que desees del desplegable. Si no encuentras la etiqueta que buscas, escríbela y pulsa Intro para registrarla.</Tooltip>}>
                            <span id="tooltip-ven" className="block">

                                <CreatableSelect
                                    className="mb-3 mt-3"
                                    isMulti
                                    isClearable
                                    placeholder='Etiquetas...'
                                    //value={selected}                               
                                    // getOptionValue={option => option.value}                                   
                                    onChange={(e) => handleChangeEtiquetas(e)}
                                    options={options}
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'grey',
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

                            </span>
                        </OverlayTrigger>

                        <div className="row">
                            <div className="col">
                                <input
                                    id="uploadCaptureInputFile"
                                    type="file"
                                    className="form-control bg-dark text-light rounded-0 border border-secondary"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                {
                                    preFile === null ? (<div></div>) : (<div className="text-end">
                                        <div className="boton-tancar">
                                            <button type="button" className="rounded-circle btn-close light bg-danger p-2" aria-label="Close" onClick={resetImage}></button>
                                        </div>
                                        <img style={{ width: '100%' }} alt="" src={preFile} />

                                    </div>)
                                }

                            </div>

                        </div>

                        <div className="my-3">
                            <button
                                className="btn btn-primary w-100"
                                disabled={loading || !file}
                            >
                                {!loading ? (
                                    "Subir"
                                ) : (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>            
        </div>
    );
};

export default ImageForm;
