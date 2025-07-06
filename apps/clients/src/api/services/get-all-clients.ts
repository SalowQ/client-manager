import { apiClient } from "../client";
import type { ApiClient } from "../types";

export async function getAllClients(
  page = 1,
  limit = 16
): Promise<{
  clients: ApiClient[];
  totalPages: number;
  currentPage: number;
}> {
  const response = await apiClient.get("/users", {
    params: { page, limit },
  });

  const { clients, totalPages, currentPage } = response.data;

  return {
    clients: Array.isArray(clients) ? clients : [],
    totalPages,
    currentPage,
  };
}
