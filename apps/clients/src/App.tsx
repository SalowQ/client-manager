import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientsLayout from "./components/ClientsLayout";
import ListClients from "./pages/ListClients";

function App() {
  return (
    <ClientsLayout>
      <Routes>
        <Route path="list" element={<ListClients />} />
        <Route path="list-selected" element={<h2>Clientes selecionados</h2>} />
        <Route path="create" element={<h2>Criar Cliente</h2>} />
        <Route path="/" element={<h1>clients</h1>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ClientsLayout>
  );
}

export default App;
