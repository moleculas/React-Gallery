import { Route, Switch } from 'react-router-dom';
import ImagenDetalle from './paginas/ImagenDetalle'
import GaleriaImagenes from './paginas/GaleriaImagenes'
import ImagenForm from './paginas/ImagenForm'
import Login from './paginas/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from "./componentes/Navbar";

function App() {
  return (
    <div className="principal text-light">
    <Navbar />
    <div className="container p-4">
      <Switch>
        <Route path="/" exact component={GaleriaImagenes}/>
        <Route path="/upload" component={ImagenForm}/>
        <Route path="/images/:id" component={ImagenDetalle}/>
        <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
