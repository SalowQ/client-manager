export { apiClient } from "./client";
export { createClient } from "./endpoints/create-client";
export { deleteClient } from "./endpoints/delete-client";
export { getAllClients } from "./endpoints/get-all-clients";
export { getClientById } from "./endpoints/get-client-by-id";
export { updateClient } from "./endpoints/update-client";
export type {
  ApiClient,
  ApiError,
  ApiResponse,
  CreateClientPayload,
  PaginatedResponse,
} from "./types";
