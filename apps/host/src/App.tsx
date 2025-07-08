import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";

const AuthApp = lazy(() => import("auth/AuthApp"));
const ClientsApp = lazy(() => import("clients/ClientsApp"));

function AppRoutes() {
  const location = useLocation();

  const isValidRoute =
    location.pathname === "/" ||
    location.pathname.startsWith("/auth/") ||
    location.pathname.startsWith("/clients/");

  if (!isValidRoute) {
    return <NotFound />;
  }

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthApp />} />
      <Route path="/clients/*" element={<ClientsApp />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
