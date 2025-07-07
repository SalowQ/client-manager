import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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
