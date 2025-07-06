import { Button, CardGrid, ClientCard } from "ui/components";
import { mockClients, useSelectedClients } from "../components/ClientsLayout";

function formatMoneyNumber(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const ListSelectedClients = () => {
  const { selectedClients, toggleSelectClient, clearSelectedClients } =
    useSelectedClients();
  const selected = mockClients.filter((c) => selectedClients.includes(c.id));

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
        {selected.map((c) => (
          <ClientCard
            key={c.id}
            name={c.name}
            salary={formatMoneyNumber(c.salary)}
            company={formatMoneyNumber(c.companyValuation)}
            onAdd={() => toggleSelectClient(c)}
            isSelected={true}
            hideEditDelete={true}
          />
        ))}
      </CardGrid>
      {selected.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 w-full"
            onClick={clearSelectedClients}
          >
            Limpar clientes selecionados
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListSelectedClients;
