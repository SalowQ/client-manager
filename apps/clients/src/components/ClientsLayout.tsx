import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar, Topbar } from "ui/components";

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

type ClientsLayoutProps = {
  children: ReactNode;
};

const ClientsLayout = ({ children }: ClientsLayoutProps) => {
  const userName = localStorage.getItem("userName") || "Usuário";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Topbar
        userName={userName}
        menuItems={menuItems}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={menuItems}
        title={<img src="/teddy-logo.png" alt="Logo" className="h-7" />}
      />
      {children}
    </div>
  );
};

export default ClientsLayout;
