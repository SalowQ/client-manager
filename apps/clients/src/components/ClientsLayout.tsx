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
      {/* Container centralizado aplicado aqui */}
      <div className="w-full max-w-8xl mx-auto">
        <Topbar userName={userName} menuItems={menuItems} />
        {children}
      </div>
    </div>
  );
};

export default ClientsLayout;
