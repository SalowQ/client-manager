import { lazy, Suspense, useEffect, useState } from "react";
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
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

function App() {
  const location = useLocation();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setShowSkeleton(true);

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {showSkeleton ? <Loading /> : <AppRoutes />}
      </Suspense>
      {/* <ThemeToggleButton /> */}
    </>
  );
}

export default App;
