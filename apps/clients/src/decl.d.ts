declare module "ui/UiApp" {
  const UiApp: React.ComponentType;
  export default UiApp;
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
    isSelected?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    hideEditDelete?: boolean;
  }>;
  export const ClientForm: React.FC;
  export const Modal: React.FC<{
    open: boolean;
    title: string;
    children?: React.ReactNode;
    onClose: () => void;
  }>;
  export const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }>;
  export const Sidebar: React.FC<{
    open: boolean;
    onClose: () => void;
    items: Array<{
      label: string;
      url?: string;
      onClick?: () => void;
      icon?: React.ReactNode;
    }>;
    title?: React.ReactNode;
    onNavigate?: (url: string) => void;
  }>;
  export const Topbar: React.FC<{
    userName?: string;
    menuItems?: Array<{
      label: string;
      url?: string;
      onClick?: () => void;
    }>;
    onMenuClick: () => void;
    onNavigate?: (url: string) => void;
  }>;
}
