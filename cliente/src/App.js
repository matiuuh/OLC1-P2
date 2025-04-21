import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Menu } from './componentes/Menu';
import { Principal } from './componentes/Principal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Principal /><br></br></>} />
        <Route path="/reporteErrores"
          element={<><Menu /><br></br><h1>Reporte de Errores</h1></>} />
        <Route path="/reporteSimbolos"
          element={<><Menu /><br></br><h1>Reporte de Simbolos</h1></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
