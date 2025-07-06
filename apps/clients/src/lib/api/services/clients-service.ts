import { apiClient } from "../client";
import type { ApiClient, CreateClientPayload } from "../types";

// ============================================================================
// ENDPOINTS
// ============================================================================

const CLIENTS_ENDPOINTS = {
  getAll: "/users",
  getById: (id: number) => `/users/${id}`,
  create: "/users",
  update: (id: number) => `/users/${id}`,
  delete: (id: number) => `/users/${id}`,
} as const;

// ============================================================================
// FUNÇÕES DE API
// ============================================================================

export const clientsService = {
  async getAll(
    page = 1,
    limit = 16
  ): Promise<{
    clients: ApiClient[];
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const response = await apiClient.get(CLIENTS_ENDPOINTS.getAll, {
        params: { page, limit },
      });
      const { clients, totalPages, currentPage } = response.data;
      return {
        clients: Array.isArray(clients) ? clients : [],
        totalPages,
        currentPage,
      };
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<ApiClient> {
    try {
      const response = await apiClient.get<ApiClient>(
        CLIENTS_ENDPOINTS.getById(id)
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar cliente ${id}:`, error);
      throw error;
    }
  },

  async create(clientData: CreateClientPayload): Promise<ApiClient> {
    try {
      const response = await apiClient.post<ApiClient>(
        CLIENTS_ENDPOINTS.create,
        clientData
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  },

  async update(id: number, clientData: Partial<ApiClient>): Promise<ApiClient> {
    try {
      const response = await apiClient.patch<ApiClient>(
        CLIENTS_ENDPOINTS.update(id),
        clientData
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar cliente ${id}:`, error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(CLIENTS_ENDPOINTS.delete(id));
    } catch (error) {
      console.error(`Erro ao deletar cliente ${id}:`, error);
      throw error;
    }
  },
};

export default clientsService;
