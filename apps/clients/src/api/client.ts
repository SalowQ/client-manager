import axios from "axios";

const API_BASE_URL = "https://boasorte.teddybackoffice.com.br";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    }

    return response;
  },
  (error) => {
    // const status = error.response?.status;
    return Promise.reject(error);
  }
);

export default apiClient;
