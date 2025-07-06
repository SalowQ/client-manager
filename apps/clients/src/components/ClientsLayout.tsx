import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Toast, Topbar } from "ui/components";
import { ReactQueryProvider } from "../lib/react-query/provider";

// ============================================================================
// TIPOS
// ============================================================================

export type Client = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
};

type SelectedClientsContextType = {
  selectedClients: number[];
  toggleSelectClient: (client: Client) => void;
  clearSelectedClients: () => void;
};

// ============================================================================
// CONTEXT E PROVIDER
// ============================================================================

const SelectedClientsContext = createContext<
  SelectedClientsContextType | undefined
>(undefined);

export function SelectedClientsProvider({ children }: { children: ReactNode }) {
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  function toggleSelectClient(client: Client) {
    setSelectedClients((prev) => {
      if (prev.includes(client.id)) {
        return prev.filter((id) => id !== client.id);
      } else {
        return [...prev, client.id];
      }
    });
  }

  function clearSelectedClients() {
    setSelectedClients([]);
  }

  return (
    <SelectedClientsContext.Provider
      value={{ selectedClients, toggleSelectClient, clearSelectedClients }}
    >
      {children}
    </SelectedClientsContext.Provider>
  );
}

export function useSelectedClients() {
  const ctx = useContext(SelectedClientsContext);
  if (!ctx)
    throw new Error(
      "useSelectedClients must be used within a SelectedClientsProvider"
    );
  return ctx;
}

// ============================================================================
// MENU ITEMS
// ============================================================================

const menuItems = [
  {
    label: "Home",
    url: "/",
    icon: <span className="material-icons">home</span>,
  },
  {
    label: "Clientes",
    url: "/clients/list",
    icon: <span className="material-icons">people</span>,
  },
  {
    label: "Clientes selecionados",
    url: "/clients/list-selected",
    icon: <span className="material-icons">group</span>,
  },
  {
    label: "Sair",
    onClick: () => {
      localStorage.removeItem("userName");
      window.location.href = "/auth/login";
    },
    icon: <span className="material-icons">logout</span>,
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

type ClientsLayoutProps = {
  children: ReactNode;
};

const ClientsLayout = ({ children }: ClientsLayoutProps) => {
  const userName = localStorage.getItem("userName") || "Usuário";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <ReactQueryProvider>
      <SelectedClientsProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Topbar
            userName={userName}
            menuItems={menuItems}
            onMenuClick={() => setSidebarOpen(true)}
            onNavigate={handleNavigate}
          />
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            items={menuItems}
            title={
              <img src="/teddy-logo-branco.png" alt="Logo" className="h-10" />
            }
            onNavigate={handleNavigate}
          />
          {children}
          <Toast />
        </div>
      </SelectedClientsProvider>
    </ReactQueryProvider>
  );
};

export default ClientsLayout;
