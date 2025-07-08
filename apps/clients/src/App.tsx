import { QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientsLayout from "./components/ClientsLayout";
import { queryClient } from "./lib/react-query/config";
import ListClients from "./pages/ListClients";
import ListSelectedClients from "./pages/ListSelectedClients";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientsLayout>
        <Routes>
          {/* <Route path="/" element={<ListClients />} /> */}
          <Route path="list" element={<ListClients />} />
          <Route path="list-selected" element={<ListSelectedClients />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ClientsLayout>
    </QueryClientProvider>
  );
}

export default App;
