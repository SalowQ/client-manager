import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const AuthApp = lazy(() => import("auth/AuthApp"));
const ClientsApp = lazy(() => import("clients/ClientsApp"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Carregando módulo...</div>}>
        <Routes>
          <Route path="/auth/*" element={<AuthApp />} />
          <Route path="/clients/*" element={<ClientsApp />} />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          {/* <Route path="/" element={<h1>host</h1>} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
