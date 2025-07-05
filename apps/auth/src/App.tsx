import { Navigate, Route, Routes } from "react-router-dom";
import UiApp from "ui/UiApp";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <UiApp />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
