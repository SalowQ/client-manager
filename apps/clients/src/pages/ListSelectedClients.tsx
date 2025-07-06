import { Button, CardGrid, ClientCard } from "ui/components";
import { useSelectedClients, type Client } from "../components/ClientsLayout";
import { useClients } from "../lib/react-query/hooks";

function formatMoneyNumber(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const ListSelectedClients = () => {
  const { selectedClients, toggleSelectClient, clearSelectedClients } =
    useSelectedClients();

  const { data: clientsData = [], isLoading, error } = useClients();

  // Garantir que clients seja sempre um array
  const clients = Array.isArray(clientsData) ? clientsData : [];

  const selected = clients.filter((c: Client) =>
    selectedClients.includes(c.id)
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-100 p-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Carregando clientes...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-100 p-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-500">
            Erro ao carregar clientes. Tente novamente.
          </div>
        </div>
      </div>
    );
  }

  // Se não há clientes selecionados, exibe apenas a mensagem
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
