import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Errores } from './componentes/Errores';
import { Menu } from './componentes/Menu';
import { Principal } from './componentes/Principal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Principal /><br></br></>} />
        <Route path="/reporteErrores"
          element={<Errores />} />
        <Route path="/reporteSimbolos"
          element={<><Menu /><br></br><h1>Reporte de Simbolos</h1></>} />
        <Route path="/reporteAST"
          element={<><Menu /><br></br><h1>Reporte de AST</h1></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
