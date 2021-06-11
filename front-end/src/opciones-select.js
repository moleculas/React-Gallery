import axios from "axios"
import { apiUrl } from "./constantes"

const queryImagenesOptions = () => {
    let imagenes = []    
    let opciones = []    
    let opcionesSplit = []    
    let opcionesResultado = []    
    axios.get(apiUrl + "/api/images")
        .then(res => {
            imagenes = res.data;            
            imagenes.map((imagen) => (
                imagen.etiquetas.map((opcion) => (
                    opciones.push(opcion)
                ))
            ))
            const opcionesRed = opciones.flat()                      
            opcionesRed.map((opcionRed) => {
                opcionesSplit.push(opcionRed.split(","))
                return true
            }
            )
            const opcionesSplitRed = opcionesSplit.flat()              
            const resultado = opcionesSplitRed.filter((item, index) => {
                return opcionesSplitRed.indexOf(item) === index;
            })    
            resultado.map((item, index) => {
                const objeto = Object();
                objeto.value = item
                objeto.label = item
                opcionesResultado.push(objeto)
                return true
            })
            
            
        })
        return opcionesResultado

}
const options = queryImagenesOptions()

export default options;




