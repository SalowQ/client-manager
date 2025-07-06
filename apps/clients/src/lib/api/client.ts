import axios from "axios";

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

// Request interceptor para adicionar headers (ex: token)
apiClient.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar token de autenticação
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento centralizado de erros
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem("userName");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
