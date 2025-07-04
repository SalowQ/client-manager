import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="list" element={<h2>Lista de Clientes</h2>} />
      <Route path="create" element={<h2>Criar Cliente</h2>} />
      <Route path="/" element={<h1>clients</h1>} />
    </Routes>
  );
}

export default App;
