import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientsService } from "../../api/services/clients-service";
import type { ApiClient } from "../../api/types";
import { queryKeys } from "../config";

// ============================================================================
// QUERIES
// ============================================================================

export function useClients(page: number, limit: number) {
  return useQuery({
    queryKey: [...queryKeys.clients.lists(), page, limit],
    queryFn: () => clientsService.getAll(page, limit),
    staleTime: 2 * 60 * 1000,
  });
}

export function useClient(id: number) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: () => clientsService.getById(id),
    enabled: !!id,
  });
}

// ============================================================================
// MUTATIONS
// ============================================================================

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
    },
    onError: (error) => {
      console.error("Erro ao criar cliente:", error);
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ApiClient> }) =>
      clientsService.update(id, data),
    onSuccess: (updatedClient) => {
      queryClient.setQueryData(
        queryKeys.clients.detail(updatedClient.id),
        updatedClient
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
    },
    onError: (error) => {
      console.error("Erro ao atualizar cliente:", error);
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientsService.delete,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({
        queryKey: queryKeys.clients.detail(deletedId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
    },
    onError: (error) => {
      console.error("Erro ao deletar cliente:", error);
    },
  });
}
