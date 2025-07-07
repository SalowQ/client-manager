import { apiClient } from "../client";

export async function deleteClient(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
