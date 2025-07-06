import axios from "axios";
import { showErrorToast, showSuccessToast } from "ui/components";

// ============================================================================
// CONFIGURAÇÃO DO CLIENTE AXIOS
// ============================================================================

const API_BASE_URL = "https://boasorte.teddybackoffice.com.br";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================================
// INTERCEPTORS
// ============================================================================

apiClient.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toLowerCase();
    const url = response.config.url || "";

    if (
      method === "post" ||
      method === "put" ||
      method === "patch" ||
      method === "delete"
    ) {
      let message = "";

      switch (method) {
        case "post":
          message = "Item criado com sucesso!";
          break;
        case "put":
        case "patch":
          message = "Item atualizado com sucesso!";
          break;
        case "delete":
          message = "Item excluído com sucesso!";
          break;
      }

      if (url.includes("/users")) {
        message = message.replace("Item", "Cliente");
      }

      showSuccessToast(message);
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 400:
        showErrorToast(`Erro de validação: ${message}`);
        break;
      case 401:
        showErrorToast("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        break;
      case 403:
        showErrorToast("Acesso negado. Você não tem permissão para esta ação.");
        break;
      case 404:
        showErrorToast("Recurso não encontrado.");
        break;
      case 409:
        showErrorToast("Conflito: o recurso já existe ou está em uso.");
        break;
      case 422:
        showErrorToast(`Erro de validação: ${message}`);
        break;
      case 500:
        showErrorToast("Erro interno do servidor. Tente novamente mais tarde.");
        break;
      case 502:
      case 503:
      case 504:
        showErrorToast(
          "Serviço temporariamente indisponível. Tente novamente."
        );
        break;
      default:
        if (error.code === "ECONNABORTED") {
          showErrorToast("Tempo limite excedido. Verifique sua conexão.");
        } else if (error.code === "NETWORK_ERROR") {
          showErrorToast("Erro de conexão. Verifique sua internet.");
        } else {
          showErrorToast(`Erro inesperado: ${message}`);
        }
        break;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
