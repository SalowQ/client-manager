declare module "auth/AuthApp" {
  const AuthApp: React.ComponentType;
  export default AuthApp;
}

declare module "clients/ClientsApp" {
  const ClientsApp: React.ComponentType;
  export default ClientsApp;
}

declare module "ui/components" {
  import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
  export const Button: React.FC<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: "primary" | "secondary" | "outline";
    }
  >;
  export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  export const CardGrid: React.FC<{ children: React.ReactNode }>;
  export const ClientCard: React.FC<{
    name: string;
    salary: string;
    company: string;
    onAdd?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
  }>;
  export const ClientForm: React.FC;
  export const Modal: React.FC<{
    open: boolean;
    title: string;
    children?: React.ReactNode;
  }>;
  export const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }>;
  export const Sidebar: React.FC;
  export const Topbar: React.FC<{
    userName?: string;
    menuItems?: Array<{
      label: string;
      url?: string;
      onClick?: () => void;
    }>;
  }>;
  export const ThemeToggleButton: React.FC;
}
