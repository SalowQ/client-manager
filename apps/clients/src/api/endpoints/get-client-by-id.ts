import { apiClient } from "../client";
import type { ApiClient } from "../types";

export async function getClientById(id: number): Promise<ApiClient> {
  const response = await apiClient.get<ApiClient>(`/users/${id}`);
  return response.data;
}
