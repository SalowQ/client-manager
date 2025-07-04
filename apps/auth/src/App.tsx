import { Route, Routes } from "react-router-dom";
import UiApp from "ui/UiApp";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <UiApp />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
