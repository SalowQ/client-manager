import { useState } from "react";
import {
  Button,
  CardGrid,
  ClientCard,
  ClientForm,
  Modal,
  Pagination,
} from "ui/components";

const mockClients = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: "Eduardo",
  salary: "R$3.500,00",
  company: "R$120.000,00",
}));

const ListClients = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Removido o padding lateral externo */}
      <main className="w-full mt-4 md:mt-6 px-12">
        {/* Aqui o conteúdo estará alinhado com o espaço entre logo e saudação */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">
            <span className="font-bold">16</span> clientes encontrados:
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Clientes por página:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>16</option>
              <option>34</option>
              <option>64</option>
            </select>
          </div>
        </div>

        <CardGrid>
          {mockClients.map((c) => (
            <ClientCard key={c.id} />
          ))}
        </CardGrid>

        <div className="flex flex-col items-center mt-8 gap-4">
          <Button
            variant="primary"
            className="max-w-xs border border-orange-400 bg-white text-orange-500 hover:bg-orange-50 hover:text-orange-600"
            onClick={() => setModalOpen(true)}
          >
            Criar cliente
          </Button>
          <Pagination />
        </div>
      </main>

      <Modal open={modalOpen} title="Criar cliente">
        <ClientForm />
        <div className="flex justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ListClients;
