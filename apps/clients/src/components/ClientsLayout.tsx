import type { ReactNode } from "react";
import { Topbar } from "ui/components";

type ClientsLayoutProps = {
  children: ReactNode;
};

const ClientsLayout = ({ children }: ClientsLayoutProps) => {
  const userName = localStorage.getItem("userName") || "Usuário";
  const menuItems = [
    {
      label: "Clientes",
      url: "/clients/list",
    },
    {
      label: "Clientes selecionados",
      url: "/clients/list-selected",
    },
    {
      label: "Sair",
      onClick: () => {
        localStorage.removeItem("userName");
        window.location.href = "/auth/login";
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Topbar userName={userName} menuItems={menuItems} />
      {children}
    </div>
  );
};

export default ClientsLayout;
