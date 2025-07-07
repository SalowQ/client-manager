import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Button, CardGrid, ClientCard } from "ui/components";
import { useSelectedClients, type Client } from "../components/ClientsLayout";
import { formatMoneyNumber } from "../lib/utils";

const useCachedClients = (): Client[] => {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const queries = queryClient.getQueriesData({ queryKey: ["clients"] });
    const allClients: Client[] = [];
    const seenIds = new Set<number>();

    for (const [_queryKey, data] of queries) {
      if (data && typeof data === "object" && "clients" in data) {
        const clients = (data as any).clients || [];
        for (const client of clients) {
          if (client && client.id && !seenIds.has(client.id)) {
            allClients.push(client);
            seenIds.add(client.id);
          }
        }
      }
    }

    return allClients;
  }, [queryClient]);
};

const ListSelectedClients = () => {
  const { selectedClients, toggleSelectClient, clearSelectedClients } =
    useSelectedClients();

  const clients = useCachedClients();
  const selected = clients.filter((c: Client) =>
    selectedClients.includes(c.id)
  );

  if (selected.length === 0) {
    return (
      <div className="bg-gray-100 p-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-600 mb-2">
            Nenhum cliente selecionado
          </h2>
          <p className="text-gray-500">
            Selecione clientes na lista principal para visualizá-los aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-xl font-bold mb-4">Clientes selecionados:</h2>
      <CardGrid>
        {selected.map((c: Client) => (
          <ClientCard
            key={c.id}
            name={c.name}
            salary={formatMoneyNumber(c.salary)}
            company={formatMoneyNumber(c.companyValuation)}
            onAdd={() => toggleSelectClient(c)}
            isSelected={true}
          />
        ))}
      </CardGrid>
      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          className="border-orange-500 text-orange-500 w-full"
          onClick={clearSelectedClients}
        >
          Limpar clientes selecionados
        </Button>
      </div>
    </div>
  );
};

export default ListSelectedClients;
