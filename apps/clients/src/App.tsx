import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientsLayout from "./components/ClientsLayout";
import ListClients from "./pages/ListClients";
import ListSelectedClients from "./pages/ListSelectedClients";

function App() {
  return (
    <ClientsLayout>
      <Routes>
        <Route path="list" element={<ListClients />} />
        <Route path="list-selected" element={<ListSelectedClients />} />
        <Route path="create" element={<h2>Criar Cliente</h2>} />
        <Route path="/" element={<h1>clients</h1>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ClientsLayout>
  );
}

export default App;
