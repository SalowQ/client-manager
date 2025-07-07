import { apiClient } from "../client";
import type { ApiClient } from "../types";

export async function updateClient(
  id: number,
  clientData: Partial<ApiClient>
): Promise<ApiClient> {
  const response = await apiClient.patch<ApiClient>(`/users/${id}`, clientData);
  return response.data;
}
