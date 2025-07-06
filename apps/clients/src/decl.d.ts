declare module "ui/UiApp" {
  const UiApp: React.ComponentType;
  export default UiApp;
}

declare module "ui/components" {
  import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
  import { ToastOptions } from "react-toastify";

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

  // Toast Types
  export type ToastType = "success" | "error" | "warning" | "info";

  export interface ToastProps {
    type: ToastType;
    message: string;
    options?: ToastOptions;
  }

  export interface ToastContainerProps {
    position?:
      | "top-right"
      | "top-center"
      | "top-left"
      | "bottom-right"
      | "bottom-center"
      | "bottom-left";
    autoClose?: number;
    hideProgressBar?: boolean;
    newestOnTop?: boolean;
    closeOnClick?: boolean;
    rtl?: boolean;
    pauseOnFocusLoss?: boolean;
    draggable?: boolean;
    pauseOnHover?: boolean;
    theme?: "light" | "dark" | "colored";
  }

  // Toast Component
  export const Toast: React.FC<ToastContainerProps>;

  // Toast Functions
  export const showToast: (props: ToastProps) => void;
  export const showSuccessToast: (
    message: string,
    options?: ToastOptions
  ) => void;
  export const showErrorToast: (
    message: string,
    options?: ToastOptions
  ) => void;
  export const showWarningToast: (
    message: string,
    options?: ToastOptions
  ) => void;
  export const showInfoToast: (message: string, options?: ToastOptions) => void;
}
