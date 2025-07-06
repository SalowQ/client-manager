// ============================================================================
// EXPORTAÇÕES DA API
// ============================================================================

export { apiClient } from "./client";
export { createClient } from "./services/create-client";
export { deleteClient } from "./services/delete-client";
export { getAllClients } from "./services/get-all-clients";
export { getClientById } from "./services/get-client-by-id";
export { updateClient } from "./services/update-client";
export type {
  ApiClient,
  ApiError,
  ApiResponse,
  CreateClientPayload,
  PaginatedResponse,
} from "./types";
