import type { ToastOptions } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ============================================================================
// TIPOS
// ============================================================================

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

// ============================================================================
// CONFIGURAÇÕES PADRÃO
// ============================================================================

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// ============================================================================
// FUNÇÃO PARA EXIBIR TOAST
// ============================================================================

export const showToast = ({ type, message, options = {} }: ToastProps) => {
  const toastOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

// ============================================================================
// FUNÇÕES CONVENIÊNCIA
// ============================================================================

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  showToast({ type: "success", message, options });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  showToast({ type: "error", message, options });
};

export const showWarningToast = (message: string, options?: ToastOptions) => {
  showToast({ type: "warning", message, options });
};

export const showInfoToast = (message: string, options?: ToastOptions) => {
  showToast({ type: "info", message, options });
};

// ============================================================================
// COMPONENTE CONTAINER
// ============================================================================

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

export const Toast = ({
  position = "top-right",
  autoClose = 3000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = "colored",
}: ToastContainerProps) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
    />
  );
};

export default Toast;
