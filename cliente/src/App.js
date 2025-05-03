import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Errores } from './componentes/Errores';
import { Menu } from './componentes/Menu';
import { Principal } from './componentes/Principal';
import { Simbolos } from './componentes/Simbolos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Principal /><br></br></>} />
        <Route path="/reporteErrores"
          element={<Errores />} />
        <Route path="/reporteSimbolos"
          element={<><Menu /><Simbolos /></>} />
        <Route path="/reporteAST"
          element={<><Menu /><br></br><h1>Reporte de AST</h1></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
