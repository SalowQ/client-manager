declare module "ui/UiApp" {
  const UiApp: React.ComponentType;
  export default UiApp;
}

declare module "ui/components" {
  import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
  export const Button: React.FC<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: "primary" | "secondary";
    }
  >;
  export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  export const CardGrid: React.FC<{ children: React.ReactNode }>;
  export const ClientCard: React.FC;
  export const ClientForm: React.FC;
  export const Modal: React.FC<{
    open: boolean;
    title: string;
    children?: React.ReactNode;
  }>;
  export const Pagination: React.FC;
  export const Sidebar: React.FC;
  export const Topbar: React.FC<{
    userName?: string;
    menuItems?: Array<{
      label: string;
      url?: string;
      onClick?: () => void;
    }>;
  }>;
}
