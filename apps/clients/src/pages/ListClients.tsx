import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  CardGrid,
  ClientCard,
  Input,
  Modal,
  Pagination,
} from "ui/components";

const mockClients = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  name: `Cliente ${i + 1}`,
  salary: 3500 + i * 10,
  companyValuation: 100000 + i * 1000,
  createdAt: new Date(2025, 6, 6, 4, 0, 53, 200).toISOString(),
  updatedAt: new Date(2025, 6, 6, 4, 0, 53, 200).toISOString(),
}));

const CLIENTS_PER_PAGE_OPTIONS = [8, 16, 32, 64];

type Client = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
};
type FormField = "name" | "salary" | "companyValuation";

const ListClients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clientsPerPage, setClientsPerPage] = useState(
    CLIENTS_PER_PAGE_OPTIONS[1]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  // Estados do formulário
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: { name: "", salary: "", companyValuation: "" },
  });

  function formatMoneyNumber(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatMoney(value: string) {
    let v = value.replace(/\D/g, "");
    const num = Number(v);
    if (!v || num === 0) return "";
    v = (num / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return "R$ " + v;
  }

  function handleMaskedChange(
    field: FormField,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const raw = e.target.value.replace(/\D/g, "");
    const num = Number(raw);
    if (!raw || num === 0) {
      setValue(field, "");
      if (errors[field]) clearErrors(field);
      return;
    }
    setValue(field, formatMoney(e.target.value));
    register(field).onChange(e);
    if (errors[field]) clearErrors(field);
  }

  function renderInput({
    label,
    name,
    placeholder,
    maskMoney = false,
    type = "text",
  }: {
    label: string;
    name: FormField;
    placeholder: string;
    maskMoney?: boolean;
    type?: string;
  }) {
    return (
      <label className="flex flex-col text-sm">
        {label}
        <Input
          className="border rounded px-2 py-1 mt-1"
          type={type}
          placeholder={placeholder}
          {...register(name, { required: `Preencha o ${label.toLowerCase()}` })}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? errors[name].message : undefined}
          inputMode={maskMoney ? "numeric" : undefined}
          onChange={
            maskMoney
              ? (e) => handleMaskedChange(name, e)
              : (e) => {
                  register(name).onChange(e);
                  if (errors[name]) clearErrors(name);
                }
          }
        />
        {errors[name] && (
          <span className="text-red-500 text-xs mt-1">
            {errors[name]?.message as string}
          </span>
        )}
      </label>
    );
  }

  useEffect(() => {
    if (editingClient) {
      setValue("name", editingClient.name);
      setValue("salary", formatMoneyNumber(editingClient.salary));
      setValue(
        "companyValuation",
        formatMoneyNumber(editingClient.companyValuation)
      );
    } else {
      reset();
    }
  }, [editingClient, setValue, reset]);

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

  // Função para fechar e resetar o modal
  function handleCloseModal() {
    setModalOpen(false);
    setEditingClient(null);
    reset();
  }

  // Função para abrir modal para editar
  function handleEditClient(client: Client) {
    setEditingClient(client);
    setModalOpen(true);
  }

  function handleDeleteClient(client: Client) {
    setDeletingClient(client);
    setDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setDeleteModalOpen(false);
    setDeletingClient(null);
  }

  function handleConfirmDelete() {
    alert(`Cliente excluído: ${deletingClient?.name}`);
    handleCloseDeleteModal();
  }

  function handleToggleSelectClient(client: Client) {
    setSelectedClients((prev) => {
      if (prev.includes(client.id)) {
        return prev.filter((id) => id !== client.id);
      } else {
        return [...prev, client.id];
      }
    });
  }

  return (
    <>
      <div className="flex flex-1">
        <main className="w-full mt-4 md:mt-6 px-18">
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
              <ClientCard
                key={c.id}
                name={c.name}
                salary={formatMoneyNumber(c.salary)}
                company={formatMoneyNumber(c.companyValuation)}
                onAdd={() => handleToggleSelectClient(c)}
                isSelected={selectedClients.includes(c.id)}
                onEdit={() => handleEditClient(c)}
                onDelete={() => handleDeleteClient(c)}
              />
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
      <Modal
        open={modalOpen}
        title={editingClient ? "Editar cliente" : "Criar cliente"}
        onClose={handleCloseModal}
      >
        <form
          className="flex flex-col gap-3 p-4"
          onSubmit={handleSubmit((data) => {
            if (editingClient) {
              alert(
                `Cliente editado: ${data.name}, ${data.salary}, ${data.companyValuation}`
              );
            } else {
              alert(
                `Cliente criado: ${data.name}, ${data.salary}, ${data.companyValuation}`
              );
            }
            handleCloseModal();
          })}
        >
          {renderInput({
            label: "Nome",
            name: "name",
            placeholder: "Digite o nome:",
          })}
          {renderInput({
            label: "Salário",
            name: "salary",
            placeholder: "Digite o salário:",
            maskMoney: true,
          })}
          {renderInput({
            label: "Valor da empresa",
            name: "companyValuation",
            placeholder: "Digite o valor da empresa:",
            maskMoney: true,
          })}
          <Button
            type="submit"
            className="bg-orange-500 text-white rounded px-4 py-2 mt-2 hover:bg-orange-600"
          >
            {editingClient ? "Editar cliente" : "Criar cliente"}
          </Button>
        </form>
      </Modal>
      <Modal
        open={deleteModalOpen}
        title="Excluir cliente:"
        onClose={handleCloseDeleteModal}
      >
        <div className="p-4">
          <p>
            Você está prestes a excluir o cliente: <b>{deletingClient?.name}</b>
          </p>
          <Button
            className="bg-orange-500 text-white rounded px-4 py-2 mt-4 w-full hover:bg-orange-600"
            onClick={handleConfirmDelete}
          >
            Excluir cliente
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ListClients;
