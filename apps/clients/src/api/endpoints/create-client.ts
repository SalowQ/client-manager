import { apiClient } from "../client";
import type { ApiClient, CreateClientPayload } from "../types";

export async function createClient(
  clientData: CreateClientPayload
): Promise<ApiClient> {
  const response = await apiClient.post<ApiClient>("/users", clientData);
  return response.data;
}
