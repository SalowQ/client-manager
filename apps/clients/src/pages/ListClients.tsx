import { useState } from "react";
import {
  Button,
  CardGrid,
  ClientCard,
  ClientForm,
  Modal,
  Pagination,
} from "ui/components";

const mockClients = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: "Eduardo",
  salary: "R$3.500,00",
  company: "R$120.000,00",
}));

const CLIENTS_PER_PAGE_OPTIONS = [8, 16, 32, 64];

const ListClients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clientsPerPage, setClientsPerPage] = useState(
    CLIENTS_PER_PAGE_OPTIONS[1]
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalClients = mockClients.length;
  const totalPages = Math.ceil(totalClients / clientsPerPage);
  const startIdx = (currentPage - 1) * clientsPerPage;
  const endIdx = startIdx + clientsPerPage;
  const clientsToShow = mockClients.slice(startIdx, endIdx);

  const handleClientsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setClientsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex flex-1">
        <main className="w-full mt-4 md:mt-6 px-12">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              <span className="font-bold">{totalClients}</span> clientes
              encontrados:
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Clientes por página:</span>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={clientsPerPage}
                onChange={handleClientsPerPageChange}
              >
                {CLIENTS_PER_PAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <CardGrid>
            {clientsToShow.map((c) => (
              <ClientCard key={c.id} />
            ))}
          </CardGrid>
          <div className="flex flex-col items-center mt-8 gap-4">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Criar cliente
            </Button>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
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
