// ============================================================================
// TIPOS DA API
// ============================================================================

export type ApiClient = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateClientPayload = {
  name: string;
  salary: number;
  companyValuation: number;
};

// ============================================================================
// TIPOS DE ERRO
// ============================================================================

export type ApiError = {
  message: string;
  status: number;
  code?: string;
};
