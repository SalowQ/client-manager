import { QueryClient } from "@tanstack/react-query";

// ============================================================================
// CONFIGURAÇÕES DO REACT QUERY
// ============================================================================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// ============================================================================
// QUERY KEYS
// ============================================================================

export const queryKeys = {
  clients: {
    all: ["clients"] as const,
    lists: () => [...queryKeys.clients.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.clients.lists(), { filters }] as const,
    details: () => [...queryKeys.clients.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.clients.details(), id] as const,
  },
} as const;
