import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AST } from './componentes/AST';
import { Errores } from './componentes/Errores';
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
          element={<Simbolos />} />
        <Route path="/reporteAST"
          element={<AST />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
